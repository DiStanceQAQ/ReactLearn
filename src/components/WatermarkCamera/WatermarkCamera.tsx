import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert, Platform } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";

export interface WatermarkCameraProps {
  watermarkText?: string;
  watermarkImageUri?: string; // optional watermark image
  watermarkPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  onCapture?: (finalImageUri: string) => void;
  style?: any;
}

const WatermarkCamera: React.FC<WatermarkCameraProps> = ({
  watermarkText = "",
  watermarkImageUri,
  watermarkPosition = "bottom-right",
  onCapture,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<Camera | null>(null);
  const viewShotRef = useRef<ViewShot | null>(null);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<string | null>(null);

  const devices = useCameraDevices();
  let device: any;
  if (Array.isArray(devices)) {
    device = devices.find((d: any) => d.position === "back") || devices[0];
  } else {
    const devs = devices as any;
    device = devs.back || devs.front || Object.values(devs)[0];
  }

  useEffect(() => {
    (async () => {
      try {
        await Camera.requestCameraPermission();
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const status = await Camera.getCameraPermissionStatus();
        setCameraPermission(status as string);
      } catch (e) {
        setCameraPermission(null);
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      setProcessing(true);
      const photo: any =
        (await (cameraRef.current as any).takePhoto?.({ flash: "off" })) ||
        (await (cameraRef.current as any).takePicture?.());
      if (!photo) throw new Error("无法拍照（camera API 不可用）");
      const path = photo.path || photo.uri || photo.filePath;
      const uri = path && Platform.OS === "android" && !path.startsWith("file://") ? `file://${path}` : path;
      setPreviewUri(uri);
    } catch (e) {
      Alert.alert("拍照失败", (e as Error).message || "未知错误");
    } finally {
      setProcessing(false);
    }
  };

  const saveWithWatermark = async () => {
    if (!viewShotRef.current) return;
    try {
      setProcessing(true);
      const uri = await viewShotRef.current.capture?.();
      if (!uri) throw new Error("无法生成带水印图片");
      onCapture && onCapture(uri);
      Alert.alert("已保存", `图片已生成：${uri}`);
    } catch (e) {
      Alert.alert("生成失败", (e as Error).message || "无法生成带水印图片");
    } finally {
      setProcessing(false);
    }
  };

  const retake = () => setPreviewUri(null);

  const renderWatermark = () => {
    const posStyle: any = {};
    switch (watermarkPosition) {
      case "top-left":
        posStyle.left = 12;
        posStyle.top = 12;
        break;
      case "top-right":
        posStyle.right = 12;
        posStyle.top = 12;
        break;
      case "bottom-left":
        posStyle.left = 12;
        posStyle.bottom = 12;
        break;
      case "bottom-right":
        posStyle.right = 12;
        posStyle.bottom = 12;
        break;
      case "center":
        posStyle.left = 0;
        posStyle.right = 0;
        posStyle.top = 0;
        posStyle.bottom = 0;
        posStyle.justifyContent = "center";
        posStyle.alignItems = "center";
        break;
    }

    return (
      <View pointerEvents="none" style={[styles.watermarkWrap, posStyle]}>
        {watermarkImageUri ? <Image source={{ uri: watermarkImageUri }} style={styles.watermarkImage} /> : null}
        {watermarkText ? <Text style={styles.watermarkText}>{watermarkText}</Text> : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {!previewUri ? (
        <>
          <View style={styles.cameraWrap}>
            {device ? (
              <Camera
                ref={(ref) => {
                  cameraRef.current = ref;
                }}
                style={styles.flex}
                device={device}
                isActive={true}
                photo={true}
              >
                {renderWatermark()}
              </Camera>
            ) : (
              <View style={[styles.flex, { alignItems: "center", justifyContent: "center" }]}>
                {cameraPermission === "denied" || cameraPermission === "not-determined" ? (
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ marginBottom: 12 }}>需要相机权限以使用拍照功能</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={async () => {
                        try {
                          const newStatus = await Camera.requestCameraPermission();
                          setCameraPermission(newStatus as string);
                        } catch (e) {
                          Alert.alert("权限请求失败", "无法请求相机权限");
                        }
                      }}
                    >
                      <Text style={styles.btnText}>请求相机权限</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text>正在初始化相机...</Text>
                )}
              </View>
            )}
          </View>

          <View style={[styles.captureFooter, { paddingBottom: insets.bottom + 12 }]}>
            <View style={styles.captureRing}>
              <TouchableOpacity
                style={styles.captureBtn}
                onPress={takePhoto}
                disabled={processing}
                accessibilityLabel="拍照"
              >
                {processing ? <ActivityIndicator color="#fff" /> : <Text style={styles.captureText}>拍照</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.cameraWrap}>
            <ViewShot ref={viewShotRef} style={styles.flex} options={{ format: "jpg", quality: 0.9 }}>
              {previewUri ? <Image source={{ uri: previewUri }} style={[styles.flex, { resizeMode: "cover" }]} /> : null}
              {renderWatermark()}
            </ViewShot>
          </View>

          <View style={[styles.previewFooter, { paddingBottom: insets.bottom + 12 }]}>
            <TouchableOpacity style={styles.btn} onPress={retake} accessibilityLabel="重拍">
              <Text style={styles.btnText}>重拍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#007AFF" }]}
              onPress={saveWithWatermark}
              disabled={processing}
              accessibilityLabel="保存带水印图片"
            >
              {processing ? <ActivityIndicator color="#fff" /> : <Text style={[styles.btnText, { color: "#fff" }]}>保存带水印</Text>}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  flex: { flex: 1 },
  cameraWrap: { flex: 1, backgroundColor: "#000" },
  controls: { position: "absolute", bottom: 24, left: 0, right: 0, alignItems: "center" },
  captureFooter: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  captureRing: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    zIndex: 2,
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#007AFF",
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  captureText: { color: "#fff", fontWeight: "600" },
  watermarkWrap: { position: "absolute", padding: 6, flexDirection: "row", alignItems: "center" },
  watermarkText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  watermarkImage: { width: 40, height: 40, resizeMode: "contain" },
  previewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 0,
  },
  btn: { paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "#fff", borderRadius: 8 },
  btnText: { color: "#333" },
});

export default WatermarkCamera;
