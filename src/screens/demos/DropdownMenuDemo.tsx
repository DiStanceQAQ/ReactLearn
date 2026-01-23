import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable
} from "react-native";
import DropdownMenuComponent, { useDropdownMenuContext } from "../../components/basic/dropdownMenu/DropdownMenuComponent";
import DropdownItemComponent, { DropdownOption } from "../../components/basic/dropdownMenu/DropdownItemComponent";
import { Colors } from "../../constants/colors";
import { Theme } from "../../constants/theme";
import ButtonComponent from "../../components/basic/button/ButtonComponent";

type CloseButtonProps = Omit<React.ComponentProps<typeof ButtonComponent>, "onPress"> & {
  onPress?: () => void;
};

const goodsOptions: DropdownOption[] = [
  { text: "全部商品", value: "all" },
  { text: "新品商品", value: "new" },
  { text: "活动商品", value: "promo" }
];

const orderOptions: DropdownOption[] = [
  { text: "默认排序", value: "default" },
  { text: "好评优先", value: "rate" },
  { text: "销量优先", value: "sales" },
  { text: "距离优先", value: "distance" }
];

const brandOptions: DropdownOption[] = [
  { text: "全部品牌", value: "all" },
  { text: "苹果", value: "apple" },
  { text: "华为", value: "huawei" },
  { text: "小米", value: "mi" },
  { text: "荣耀", value: "honor" },
  { text: "vivo", value: "vivo" }
];

const radiusOptions: DropdownOption[] = [
  { text: "1km 内", value: "1" },
  { text: "3km 内", value: "3" },
  { text: "5km 内", value: "5" },
  { text: "10km 内", value: "10" }
];

function CloseMenuButton({ onPress, ...rest }: CloseButtonProps) {
  const menu = useDropdownMenuContext();
  return (
    <ButtonComponent
      {...rest}
      onPress={() => {
        onPress?.();
        menu?.closeMenu();
      }}
    />
  );
}

const DropdownMenuDemo = () => {
  const [goods, setGoods] = useState<string>("all");
  const [order, setOrder] = useState<string>("default");
  const [radius, setRadius] = useState<string>("3");
  const [brand, setBrand] = useState<string>("all");
  const [tag, setTag] = useState<string>("all");

  const selectedDesc = useMemo(
    () => `商品: ${goods} | 排序: ${order} | 距离: ${radius}km | 品牌: ${brand} | 标签: ${tag}`,
    [brand, goods, order, radius, tag]
  );

  const renderChip = (label: string, value: string, current: string, onSelect: (val: string) => void) => {
    const active = current === value;
    return (
      <Pressable
        key={value}
        onPress={() => onSelect(value)}
        style={[
          styles.chip,
          active ? styles.chipActive : null
        ]}
      >
        <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{label}</Text>
      </Pressable>
    );
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{content}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSection(
          "基础用法",
          <View style={styles.block}>
            <DropdownMenuComponent activeColor={Colors.primary}>
              <DropdownItemComponent
                options={goodsOptions}
                value={goods}
                onChange={val => setGoods(String(val))}
              />
              <DropdownItemComponent
                title="默认排序"
                options={orderOptions}
                value={order}
                onChange={val => setOrder(String(val))}
              />
            </DropdownMenuComponent>
            <View style={styles.optionListPreview}>
              <Text style={styles.helperTitle}>当前选中</Text>
              <Text style={styles.helperText}>{goods} / {order}</Text>
            </View>
          </View>
        )}

        {renderSection(
          "自定义选中态颜色",
          <View style={styles.block}>
            <DropdownMenuComponent activeColor="#ee0a24" inactiveColor={Colors.text.secondary}>
              <DropdownItemComponent
                options={goodsOptions}
                value={goods}
                onChange={val => setGoods(String(val))}
              />
              <DropdownItemComponent
                title="默认排序"
                options={orderOptions}
                value={order}
                onChange={val => setOrder(String(val))}
              />
            </DropdownMenuComponent>
          </View>
        )}

        {renderSection(
          "横向滚动",
          <View style={styles.block}>
            <DropdownMenuComponent activeColor={Colors.primary} swipeThreshold={3}>
              <DropdownItemComponent
                options={goodsOptions}
                value={goods}
                onChange={val => setGoods(String(val))}
              />
              <DropdownItemComponent
                title="品牌"
                options={brandOptions}
                value={brand}
                onChange={val => setBrand(String(val))}
              />
              <DropdownItemComponent
                title="默认排序"
                options={orderOptions}
                value={order}
                onChange={val => setOrder(String(val))}
              />
              <DropdownItemComponent
                title="距离"
                options={radiusOptions}
                value={radius}
                onChange={val => setRadius(String(val))}
              />
            </DropdownMenuComponent>
          </View>
        )}

        {renderSection(
          "向上展开",
          <View style={styles.block}>
            <DropdownMenuComponent activeColor={Colors.primary} direction="up">
              <DropdownItemComponent
                options={goodsOptions}
                value={goods}
                onChange={val => setGoods(String(val))}
              />
              <DropdownItemComponent
                title="默认排序"
                options={orderOptions}
                value={order}
                onChange={val => setOrder(String(val))}
              />
            </DropdownMenuComponent>
          </View>
        )}

        {renderSection(
          "自定义内容",
          <View style={styles.block}>
            <DropdownMenuComponent activeColor="#1989fa" overlay>
              <DropdownItemComponent
                title="距离"
                options={radiusOptions}
                value={radius}
                onChange={val => setRadius(String(val))}
              />
              <DropdownItemComponent title="筛选">
                <View style={styles.customPanel}>
                  <Text style={styles.subtitle}>按标签筛选</Text>
                  <View style={styles.chipRow}>
                    {renderChip("全部", "all", tag, setTag)}
                    {renderChip("美食", "food", tag, setTag)}
                    {renderChip("休闲", "fun", tag, setTag)}
                    {renderChip("周边游", "travel", tag, setTag)}
                    {renderChip("其他", "other", tag, setTag)}
                  </View>

                  <View style={styles.customActions}>
                    <ButtonComponent text="重置" onPress={() => setTag("all")} />
                    <CloseMenuButton text="完成" type="primary" />
                  </View>
                </View>
              </DropdownItemComponent>
            </DropdownMenuComponent>
          </View>
        )}

        {renderSection(
          "当前选择",
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{selectedDesc}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DropdownMenuDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  scrollView: {
    flex: 1
  },
  section: {
    marginBottom: Theme.spacing.xl
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.md
  },
  sectionContent: {
    backgroundColor: Colors.white,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
    ...Theme.shadow.card
  },
  block: {
    gap: Theme.spacing.md
  },
  optionListPreview: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md
  },
  helperTitle: {
    fontSize: Theme.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Theme.spacing.xs
  },
  helperText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.primary
  },
  customPanel: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.md
  },
  subtitle: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.primary,
    fontWeight: "600"
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.sm
  },
  chip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.md,
    borderWidth: Theme.border.width,
    borderColor: Colors.border,
    backgroundColor: Colors.white
  },
  chipActive: {
    backgroundColor: "#e8f3ff",
    borderColor: Colors.primary
  },
  chipText: {
    color: Colors.text.primary,
    fontSize: Theme.fontSize.sm
  },
  chipTextActive: {
    color: Colors.primary,
    fontWeight: "600"
  },
  customActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Theme.spacing.md
  },
  resultBox: {
    padding: Theme.spacing.lg
  },
  resultText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: 20
  }
});
