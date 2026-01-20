import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import CellComponent from '../components/basic/cell/CellComponent';

export const TodoScreen = () => {
  // 状态管理
  const [clickCount, setClickCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const handleCellPress = (message: string, action?: () => void) => {
    setClickCount(prev => prev + 1);
    Alert.alert('Cell 点击事件', message, [
      { text: '确定', onPress: action },
      { text: '取消', style: 'cancel' }
    ]);
  };

  const handleUrlPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('错误', '无法打开链接');
      }
    } catch (error) {
      Alert.alert('错误', '打开链接失败');
    }
  };

  const refreshTime = () => {
    setCurrentTime(new Date().toLocaleTimeString());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CellComponent 完整功能测试</Text>
        <Text style={styles.subtitle}>测试所有Props和功能特性</Text>
        <Text style={styles.counter}>点击次数: {clickCount} | 时间: {currentTime}</Text>
      </View>

      {/* 1. 基础用法测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>📝 基础用法</Text>
        <Text style={styles.description}>测试title、value、label基本属性</Text>
        <View style={styles.cellGroup}>
          <CellComponent title="用户名" value="张三" />
          <CellComponent title="邮箱地址" value="user@example.com" />
          <CellComponent
            title="个人简介"
            label="这里是描述信息，展示在标题下方"
            value="查看详情"
          />
        </View>
      </View>

      {/* 2. CellGroup 分组测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>📁 CellGroup 分组功能</Text>
        <Text style={styles.description}>测试分组标题、inset、border属性</Text>

        {/* 普通分组 */}
        <CellComponent.Group title="基本信息" border={true}>
          <CellComponent title="姓名" value="李四" />
          <CellComponent title="年龄" value="28岁" />
        </CellComponent.Group>

        {/* 卡片风格分组 */}
        <CellComponent.Group title="账户设置" inset={true} border={true} style={{ marginTop: 10 }}>
          <CellComponent title="密码修改" value="修改" isLink={true} />
          <CellComponent title="登录设备" value="管理" isLink={true} />
        </CellComponent.Group>

        {/* 无边框分组 */}
        <CellComponent.Group border={false} style={{ marginTop: 10 }}>
          <CellComponent title="系统版本" value="v2.1.0" />
          <CellComponent title="更新时间" value={currentTime} />
        </CellComponent.Group>
      </View>

      {/* 3. 可点击功能测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>👆 可点击功能</Text>
        <Text style={styles.description}>测试onPress、url、isLink、clickable属性</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="点击事件"
            value="点击测试"
            onPress={() => handleCellPress('基础点击事件')}
          />
          <CellComponent
            title="链接跳转"
            value="打开百度"
            url="https://www.baidu.com"
            isLink={true}
          />
          <CellComponent
            title="路由跳转模拟"
            value="去设置页"
            to="/settings"
            isLink={true}
            onPress={() => handleCellPress('路由跳转 (to属性)')}
          />
          <CellComponent
            title="仅链接样式"
            value="无点击事件"
            isLink={true}
          />
        </View>
      </View>

      {/* 4. 图标功能测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>🎨 图标功能</Text>
        <Text style={styles.description}>测试icon、rightIcon属性：左侧和右侧图标显示</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="左侧图标"
            value="Emoji图标"
            icon={<Text style={styles.icon}>👤</Text>}
          />
          <CellComponent
            title="字符串图标"
            value="MaterialIcons"
            icon="person"
          />
          <CellComponent
            title="右侧图标"
            value="右边图标"
            rightIcon={<Text style={styles.icon}>🔥</Text>}
          />
          <CellComponent
            title="双侧图标"
            value="左右都有"
            icon={<Text style={styles.icon}>⭐</Text>}
            rightIcon={<Text style={styles.icon}>❤️</Text>}
            isLink={true}
          />
        </View>
      </View>

      {/* 5. 箭头方向测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>➡️ 箭头方向</Text>
        <Text style={styles.description}>测试arrowDirection属性：left、right、up、down</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="向右箭头"
            value="默认方向"
            isLink={true}
            arrowDirection="right"
          />
          <CellComponent
            title="向左箭头"
            value="返回样式"
            isLink={true}
            arrowDirection="left"
          />
          <CellComponent
            title="向上箭头"
            value="展开"
            isLink={true}
            arrowDirection="up"
          />
          <CellComponent
            title="向下箭头"
            value="折叠"
            isLink={true}
            arrowDirection="down"
          />
        </View>
      </View>

      {/* 6. 尺寸和布局测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>📏 尺寸和布局</Text>
        <Text style={styles.description}>测试size、center、border、required属性</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="大尺寸单元格"
            value="Large Size"
            size="large"
            label="更大的高度和字体"
          />
          <CellComponent
            title="正常尺寸"
            value="Normal Size"
            size="normal"
          />
          <CellComponent
            title="居中布局"
            value="Center Align"
            center={true}
          />
          <CellComponent
            title="必填字段"
            value="请输入"
            required={true}
            isLink={true}
          />
          <CellComponent
            title="无边框样式"
            value="No Border"
            border={false}
          />
        </View>
      </View>

      {/* 7. 插槽功能测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>🔧 插槽功能</Text>
        <Text style={styles.description}>测试自定义内容渲染</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.icon, { marginRight: 5 }]}>🏷️</Text>
                <Text style={{ fontWeight: 'bold', color: Colors.primary }}>自定义标题</Text>
              </View>
            }
            value="标准值"
          />
          <CellComponent
            title="自定义值显示"
            value={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Colors.primary }}>¥</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.primary }}>128.50</Text>
              </View>
            }
          />
          <CellComponent
            title="复杂描述"
            label={
              <View>
                <Text style={{ color: Colors.text.secondary, fontSize: 12 }}>
                  多行描述信息，支持复杂布局
                </Text>
                <Text style={{ color: Colors.required, fontSize: 11 }}>
                  ⚠️ 请仔细阅读
                </Text>
              </View>
            }
            value="了解更多"
            isLink={true}
          />
          <CellComponent
            title="额外内容"
            value="主要操作"
            extra={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.badge}>NEW</Text>
                <Text style={[styles.icon, { marginLeft: 5 }]}>🔥</Text>
              </View>
            }
            isLink={true}
          />
        </View>
      </View>

      {/* 8. 样式定制测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>🎨 样式定制</Text>
        <Text style={styles.description}>测试titleStyle、valueStyle、labelStyle</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="自定义标题样式"
            value="正常值"
            titleStyle={{ color: Colors.primary, fontWeight: 'bold', fontSize: 18 }}
          />
          <CellComponent
            title="自定义值样式"
            value="红色值"
            valueStyle={{ color: Colors.required, fontSize: 16 }}
          />
          <CellComponent
            title="样式描述"
            label="这个描述有自定义样式"
            value="查看"
            labelStyle={{ color: Colors.primary, fontStyle: 'italic' }}
            isLink={true}
          />
        </View>
      </View>

      {/* 9. 综合场景测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>🚀 综合场景</Text>
        <Text style={styles.description}>模拟真实应用中的复杂用法</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            icon={<Text style={styles.icon}>💳</Text>}
            title="银行卡管理"
            label="已绑定2张银行卡，支持快捷支付"
            value="管理"
            isLink={true}
            onPress={() => handleCellPress('进入银行卡管理')}
          />
          <CellComponent
            icon={<Text style={styles.icon}>📍</Text>}
            title="收货地址"
            label="默认地址：北京市朝阳区"
            value="修改"
            rightIcon={<Text style={styles.badge}>默认</Text>}
            isLink={true}
            onPress={() => handleCellPress('修改收货地址')}
          />
          <CellComponent
            icon={<Text style={styles.icon}>🔔</Text>}
            title="消息通知"
            label="您有3条未读消息，2条系统通知"
            value={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.badge}>3</Text>
                <Text style={{ marginLeft: 5, color: Colors.text.secondary }}>查看</Text>
              </View>
            }
            isLink={true}
            onPress={() => handleCellPress('查看消息通知')}
          />
          <CellComponent
            icon={<Text style={styles.icon}>⚙️</Text>}
            title="系统设置"
            label="通知、隐私、存储、关于我们"
            extra={
              <Text style={{ color: Colors.text.light, fontSize: 12 }}>
                v2.1.0
              </Text>
            }
            isLink={true}
            onPress={() => handleCellPress('进入系统设置')}
          />
        </View>
      </View>

      {/* 10. 交互测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>⚡ 交互测试</Text>
        <Text style={styles.description}>测试各种交互行为和状态变化</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="刷新时间"
            value={currentTime}
            icon={<Text style={styles.icon}>🔄</Text>}
            onPress={() => {
              refreshTime();
              handleCellPress('时间已刷新');
            }}
          />
          <CellComponent
            title="计数器"
            value={`已点击 ${clickCount} 次`}
            icon={<Text style={styles.icon}>📊</Text>}
            onPress={() => handleCellPress(`这是第 ${clickCount + 1} 次点击`)}
          />
          <CellComponent
            title="外部链接"
            value="访问GitHub"
            url="https://github.com"
            isLink={true}
          />
          <CellComponent
            title="异步操作模拟"
            value="加载中..."
            onPress={() => {
              handleCellPress('开始异步操作', () => {
                setTimeout(() => {
                  Alert.alert('完成', '异步操作已完成');
                }, 2000);
              });
            }}
          />
        </View>
      </View>

      {/* 11. 禁用状态测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>🚫 禁用状态测试</Text>
        <Text style={styles.description}>测试disabled属性：禁用时的视觉效果和交互行为</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="禁用状态"
            value="无法点击"
            disabled={true}
            onPress={() => handleCellPress('这个不应该被触发')}
          />
          <CellComponent
            title="禁用链接"
            value="无法跳转"
            url="https://www.baidu.com"
            disabled={true}
            isLink={true}
          />
          <CellComponent
            title="正常状态对比"
            value="可以点击"
            onPress={() => handleCellPress('正常点击')}
          />
        </View>
      </View>

      {/* 12. 路由模式测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>🧭 路由导航测试</Text>
        <Text style={styles.description}>测试to、replace属性：路由跳转和替换模式</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="普通跳转"
            value="navigate模式"
            to="Settings" // 模拟路由名称
            isLink={true}
            onPress={() => handleCellPress('普通跳转模式')}
          />
          <CellComponent
            title="替换跳转"
            value="replace模式"
            to="Profile"
            replace={true}
            isLink={true}
            onPress={() => handleCellPress('替换跳转模式')}
          />
          <CellComponent
            title="带参数跳转"
            value="params对象"
            to={{ name: "Detail", params: { id: 123 } }}
            isLink={true}
            onPress={() => handleCellPress('带参数的路由跳转')}
          />
        </View>
      </View>

      {/* 13. 子元素插槽测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>👶 子元素插槽测试</Text>
        <Text style={styles.description}>测试children属性：在标题行中插入自定义内容</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="标题"
            value="右侧值"
          >
            <Text style={styles.badge}>NEW</Text>
          </CellComponent>
          <CellComponent
            title="自定义徽章"
            value="重要通知"
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.badge, { backgroundColor: Colors.required }]}>HOT</Text>
              <Text style={[styles.icon, { marginLeft: 4 }]}>🔥</Text>
            </View>
          </CellComponent>
          <CellComponent
            title="状态指示器"
            value="在线"
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginLeft: 6 }} />
          </CellComponent>
        </View>
      </View>

      {/* 14. 边界情况测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>⚠️ 边界情况测试</Text>
        <Text style={styles.description}>测试极端情况：长文本、空内容、特殊字符等</Text>
        <View style={styles.cellGroup}>
          <CellComponent
            title="超长标题文本超长标题文本超长标题文本超长标题文本超长标题文本"
            value="正常值"
          />
          <CellComponent
            title="标题"
            value="超长值文本超长值文本超长值文本超长值文本超长值文本超长值文本"
          />
          <CellComponent
            title=""
            value=""
            label=""
          />
          <CellComponent
            title="特殊字符"
            value="¥$€£@#%&*()[]{}"
          />
          <CellComponent
            title="数字标题"
            value="123456789"
          />
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 5,
  },
  counter: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 8,
    fontWeight: '600',
  },
  testSection: {

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 15,
    lineHeight: 16,
  },
  cellGroup: {
    borderRadius: Theme.radius.sm,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  icon: {
    fontSize: 16,
  },
  badge: {
    fontSize: 12,
    color: Colors.white,
    backgroundColor: Colors.required,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    minWidth: 20,
  },
  refreshIcon: {
    fontSize: 14,
    color: Colors.primary,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  warningText: {
    color: Colors.required,
    fontSize: 11,
    fontStyle: 'italic',
  },
  versionText: {
    color: Colors.text.light,
    fontSize: 12,
    fontWeight: '500',
  },
});