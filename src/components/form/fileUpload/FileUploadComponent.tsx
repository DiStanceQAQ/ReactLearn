import React, { ReactNode, useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Alert
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary, ImageLibraryOptions, Asset } from "react-native-image-picker";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

export type UploadStatus = "uploading" | "failed" | "done";

export type FileItem = {
  uri: string;
  name?: string;
  size?: number;
  status?: UploadStatus;
  message?: string;
  isImage?: boolean;
};

export type FileUploadProps = {
  value?: FileItem[];
  onChange?: (list: FileItem[]) => void;
  maxCount?: number;
  multiple?: boolean;
  previewSize?: number | string | [number | string, number | string];
  previewImage?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  deletable?: boolean;
  showUpload?: boolean;
  reupload?: boolean;
  uploadText?: string;
  uploadIcon?: string;
  maxSize?: number | ((file: FileItem) => boolean);
  onOversize?: (file: FileItem) => void;
  beforeRead?: (file: FileItem) => boolean | Promise<boolean>;
  afterRead?: (file: FileItem | FileItem[]) => void;
  onDelete?: (file: FileItem, index: number) => void;
  onPressUpload?: () => void;
  previewCover?: (file: FileItem) => ReactNode;
  uploadRender?: ReactNode;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

function parseSize(size?: number | string | [number | string, number | string]) {
  if (Array.isArray(size)) {
    const [w, h] = size;
    return {
      width: typeof w === "number" ? w : parseFloat(String(w)),
      height: typeof h === "number" ? h : parseFloat(String(h))
    };
  }
  if (typeof size === "number") return { width: size, height: size };
  if (typeof size === "string") {
    const num = parseFloat(size);
    return { width: num, height: num };
  }
  return { width: 80, height: 80 };
}

function isImageAsset(asset: Asset) {
  if (asset.type) return asset.type.startsWith("image/");
  if (asset.fileName) return /\.(png|jpe?g|gif|webp|heic|bmp)$/i.test(asset.fileName);
  return true;
}

function FileUploadComponent({
  value,
  onChange,
  maxCount = Infinity,
  multiple = false,
  previewSize = 80,
  previewImage = true,
  disabled = false,
  readonly = false,
  deletable = true,
  showUpload = true,
  reupload = false,
  uploadText = "上传文件",
  uploadIcon = "add",
  maxSize = Infinity,
  onOversize,
  beforeRead,
  afterRead,
  onDelete,
  onPressUpload,
  previewCover,
  uploadRender,
  style,
  itemStyle,
  imageStyle
}: FileUploadProps) {
  const isControlled = value !== undefined;
  const [innerList, setInnerList] = useState<FileItem[]>(value || []);

  const list = isControlled ? value! : innerList;

  const sizeStyle = useMemo(() => parseSize(previewSize), [previewSize]);

  const setList = (next: FileItem[]) => {
    if (!isControlled) setInnerList(next);
    onChange?.(next);
  };

  const handleDelete = useCallback(
    (file: FileItem, index: number) => {
      const next = list.filter((_, i) => i !== index);
      setList(next);
      onDelete?.(file, index);
    },
    [list, onDelete]
  );

  const checkOverSize = useCallback(
    (file: FileItem) => {
      if (typeof maxSize === "function") return maxSize(file);
      return file.size !== undefined && file.size > Number(maxSize);
    },
    [maxSize]
  );

  const processFiles = useCallback(
    async (files: FileItem[]) => {
      const valid: FileItem[] = [];
      for (const file of files) {
        const before = beforeRead ? await beforeRead(file) : true;
        if (!before) continue;
        const oversize = checkOverSize(file);
        if (oversize) {
          onOversize?.(file);
          continue;
        }
        valid.push({ ...file, status: "uploading" });
      }
      if (!valid.length) return;
      const nextList = [...list, ...valid].slice(0, maxCount);
      setList(nextList);
      afterRead?.(multiple ? valid : valid[0]);
    },
    [afterRead, beforeRead, checkOverSize, list, maxCount, multiple, onOversize, setList]
  );

  const handlePick = useCallback(async () => {
    if (disabled || readonly) return;
    onPressUpload?.();
    const options: ImageLibraryOptions = {
      mediaType: "mixed",
      selectionLimit: multiple ? 0 : 1
    };
    const res = await launchImageLibrary(options);
    if (res.didCancel || !res.assets) return;
    const files: FileItem[] = res.assets.map(asset => ({
      uri: asset.uri || "",
      name: asset.fileName || "",
      size: asset.fileSize,
      isImage: isImageAsset(asset)
    }));
    processFiles(files);
  }, [disabled, multiple, onPressUpload, processFiles, readonly]);

  const renderItem = (file: FileItem, index: number) => {
    const status = file.status;
    const showStatus = status === "uploading" || status === "failed";
    const isImg = file.isImage !== false;
    return (
      <View key={file.uri + index} style={[styles.item, sizeStyle, itemStyle]}>
        {isImg && previewImage ? (
          <Image source={{ uri: file.uri }} style={[styles.image, imageStyle]} resizeMode="cover" />
        ) : (
          <View style={[styles.filePlaceholder, imageStyle]}>
            <MaterialIcons name="insert-drive-file" size={28} color={Colors.text.light} />
          </View>
        )}
        {previewCover ? <View style={styles.cover}>{previewCover(file)}</View> : null}
        {showStatus ? (
          <View style={[styles.statusTag, status === "failed" ? styles.statusFailed : styles.statusUploading]}>
            <Text style={styles.statusText}>{file.message || (status === "failed" ? "失败" : "上传中")}</Text>
          </View>
        ) : null}
        {deletable && !disabled && !readonly ? (
          <Pressable style={styles.deleteBtn} hitSlop={8} onPress={() => handleDelete(file, index)}>
            <MaterialIcons name="close" size={14} color={Colors.white} />
          </Pressable>
        ) : null}
      </View>
    );
  };

  const canUpload = !readonly && !disabled && showUpload && (!maxCount || list.length < maxCount);

  const uploadNode = (
    <Pressable
      style={[styles.item, sizeStyle, styles.uploadBox, itemStyle, disabled || readonly ? styles.disabled : null]}
      onPress={handlePick}
      disabled={!canUpload}
    >
      {uploadRender || (
        <>
          <MaterialIcons name={uploadIcon} size={24} color={Colors.text.light} />
          <Text style={styles.uploadText}>{uploadText}</Text>
        </>
      )}
    </Pressable>
  );

  return (
    <View style={[styles.container, style]}>
      {list.map((file, index) => renderItem(file, index))}
      {canUpload ? uploadNode : null}
    </View>
  );
}

export default FileUploadComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.md
  },
  item: {
    width: 80,
    height: 80,
    borderRadius: Theme.radius.md,
    overflow: "hidden",
    backgroundColor: Colors.background,
    borderWidth: Theme.border.width,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  filePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cover: {
    ...StyleSheet.absoluteFillObject
  },
  statusTag: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 4,
    alignItems: "center"
  },
  statusUploading: {
    backgroundColor: "rgba(25,118,210,0.2)"
  },
  statusFailed: {
    backgroundColor: "rgba(244,67,54,0.2)"
  },
  statusText: {
    color: Colors.text.primary,
    fontSize: Theme.fontSize.xs
  },
  deleteBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.45)",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  uploadBox: {
    borderStyle: "dashed",
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    gap: Theme.spacing.xs
  },
  uploadText: {
    fontSize: Theme.fontSize.sm,
    color: Colors.text.secondary
  },
  disabled: {
    opacity: Theme.opacity.disabled
  }
});
