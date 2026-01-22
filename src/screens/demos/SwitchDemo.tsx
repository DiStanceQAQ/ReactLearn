import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SwitchComponent, { SwitchValue } from "../../components/form/switch/SwitchComponent";
import { Colors } from "../../constants/colors";
import { Theme } from "../../constants/theme";

const SwitchDemo = () => {
  const [basicChecked, setBasicChecked] = useState(true);
  const [loadingChecked, setLoadingChecked] = useState(false);
  const [customValue, setCustomValue] = useState<SwitchValue>("on");
  const [nodeChecked, setNodeChecked] = useState(false);
  const [size20Checked, setSize20Checked] = useState(true);
  const [size26Checked, setSize26Checked] = useState(true);
  const [size34Checked, setSize34Checked] = useState(true);
  const [greenChecked, setGreenChecked] = useState(true);
  const [contrastChecked, setContrastChecked] = useState(true);

  const customValueLabel = useMemo(() => (customValue === "on" ? "开启" : "关闭"), [customValue]);

  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{content}</View>
    </View>
  );

  const renderRow = (label: string, control: React.ReactNode, helper?: React.ReactNode) => (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.label}>{label}</Text>
        {helper}
      </View>
      <View style={styles.control}>{control}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSection(
          "基础用法",
          <View style={styles.block}>
            {renderRow(
              "开关",
              <SwitchComponent value={basicChecked} onChange={(val) => setBasicChecked(Boolean(val))} />,
              <Text style={styles.helperText}>当前状态：{basicChecked ? "打开" : "关闭"}</Text>
            )}
          </View>
        )}

        {renderSection(
          "自定义尺寸",
          <View style={styles.block}>
            {renderRow(
              "小号 20",
              <SwitchComponent
                size={20}
                value={size20Checked}
                onChange={(val) => setSize20Checked(Boolean(val))}
              />
            )}
            {renderRow(
              "默认 26",
              <SwitchComponent
                size={26}
                value={size26Checked}
                onChange={(val) => setSize26Checked(Boolean(val))}
              />
            )}
            {renderRow(
              "大号 34",
              <SwitchComponent
                size={34}
                value={size34Checked}
                onChange={(val) => setSize34Checked(Boolean(val))}
              />
            )}
          </View>
        )}

        {renderSection(
          "禁用与加载",
          <View style={styles.block}>
            {renderRow(
              "加载中",
              <SwitchComponent
                value={loadingChecked}
                onChange={(val) => setLoadingChecked(Boolean(val))}
                loading
              />
            )}
            {renderRow("禁用-开", <SwitchComponent value disabled />)}
            {renderRow("禁用-关", <SwitchComponent value={false} disabled />)}
          </View>
        )}

        {renderSection(
          "自定义颜色",
          <View style={styles.block}>
            {renderRow(
              "绿色",
              <SwitchComponent
                value={greenChecked}
                onChange={(val) => setGreenChecked(Boolean(val))}
                activeColor="#07c160"
                inactiveColor="#d3f2e3"
              />
            )}
            {renderRow(
              "橙色",
              <SwitchComponent
                value={contrastChecked}
                onChange={(val) => setContrastChecked(Boolean(val))}
                activeColor="#ff9800"
              />
            )}
          </View>
        )}

        {renderSection(
          "自定义取值",
          <View style={styles.block}>
            {renderRow(
              "开关值",
              <SwitchComponent
                value={customValue}
                onChange={(val) => setCustomValue(val)}
                activeValue="on"
                inactiveValue="off"
                activeColor="#1989fa"
              />,
              <Text style={styles.helperText}>当前值：{customValueLabel}</Text>
            )}
          </View>
        )}

        {renderSection(
          "自定义节点与背景",
          <View style={styles.block}>
            {renderRow(
              "带图标",
              <SwitchComponent
                value={nodeChecked}
                onChange={(val) => setNodeChecked(Boolean(val))}
                activeColor="#0a84ff"
                inactiveColor="rgba(120,120,128,0.2)"
                renderNode={() => (
                  <MaterialIcons
                    name={nodeChecked ? "check" : "close"}
                    size={16}
                    color={nodeChecked ? Colors.primary : Colors.text.secondary}
                  />
                )}
                renderBackground={() => (
                  <View style={styles.backgroundTrack}>
                    <Text style={styles.backgroundText}>{nodeChecked ? "ON" : "OFF"}</Text>
                  </View>
                )}
              />
            )}
          </View>
        )}

        {renderSection(
          "使用说明",
          <View style={styles.instruction}>
            <Text style={styles.instructionText}>
              · 支持布尔值或自定义取值（activeValue/inactiveValue）{"\n"}
              · 支持尺寸、颜色、禁用、加载状态{"\n"}
              · renderNode/renderBackground 可定制节点与背景{"\n"}
              · onChange/onValueChange 在切换时触发
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwitchDemo;

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
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
    ...Theme.shadow.card
  },
  block: {
    gap: Theme.spacing.md
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Theme.spacing.md
  },
  rowText: {
    flex: 1
  },
  label: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.primary,
    fontWeight: "500"
  },
  helperText: {
    marginTop: Theme.spacing.xs,
    fontSize: Theme.fontSize.sm,
    color: Colors.text.secondary
  },
  control: {
    alignItems: "flex-end"
  },
  backgroundTrack: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundText: {
    fontSize: 10,
    color: Colors.white,
    fontWeight: "600"
  },
  instruction: {
    padding: Theme.spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Theme.radius.sm
  },
  instructionText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: 20
  }
});
