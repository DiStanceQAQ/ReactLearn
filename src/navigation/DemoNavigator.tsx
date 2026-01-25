import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ButtonDemo } from '../screens/demos/ButtonDemo';
import { CellDemo } from '../screens/demos/CellDemo';
import { FieldDemo } from '../screens/demos/FieldDemo';
import { PickerDemo } from '../screens/demos/PickerDemo';
import { CascaderDemo } from '../screens/demos/CascaderDemo';
import { CheckboxDemo } from '../screens/demos/CheckboxDemo';
import { DatePickerDemo } from '../screens/demos/DatePickerDemo';
import { ToastDemo } from '../screens/demos/ToastDemo';
import { PopupDemo } from '../screens/demos/PopupDemo';
import { FormDemo } from '../screens/demos/FormDemo';
import { ProjectCardDemo } from '../screens/demos/ProjectCardDemo';
import { BadgeDemo } from '../screens/demos/BadgeDemo';
import { EmptyDemo } from '../screens/demos/EmptyDemo';
import { ImageDemo } from '../screens/demos/ImageDemo';
import { FileUploadDemo } from '../screens/demos/FileUploadDemo';
import { CalendarDemo } from '../screens/demos/CalendarDemo';
import SwitchDemo from '../screens/demos/SwitchDemo';
import DropdownMenuDemo from '../screens/demos/DropdownMenuDemo';
import MapDemoScreen from '../screens/demos/MapDemoScreen';
import WatermarkCameraDemo from '../screens/demos/WatermarkCameraDemo';

const Stack = createNativeStackNavigator();

export const DemoNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ButtonDemo"
        component={ButtonDemo}
        options={{ title: 'Button 按钮' }}
      />
      <Stack.Screen
        name="CellDemo"
        component={CellDemo}
        options={{ title: 'Cell 单元格' }}
      />
      <Stack.Screen
        name="FieldDemo"
        component={FieldDemo}
        options={{ title: 'Field 输入框' }}
      />
      <Stack.Screen
        name="PickerDemo"
        component={PickerDemo}
        options={{ title: 'Picker 选择器' }}
      />
      <Stack.Screen
        name="CascaderDemo"
        component={CascaderDemo}
        options={{ title: 'Cascader 级联选择' }}
      />
      <Stack.Screen
        name="CheckboxDemo"
        component={CheckboxDemo}
        options={{ title: 'Checkbox 复选框' }}
      />
      <Stack.Screen
        name="DatePickerDemo"
        component={DatePickerDemo}
        options={{ title: 'DatePicker 日期选择器' }}
      />
      <Stack.Screen
        name="ToastDemo"
        component={ToastDemo}
        options={{ title: 'Toast 轻提示' }}
      />
      <Stack.Screen
        name="PopupDemo"
        component={PopupDemo}
        options={{ title: 'Popup 弹出层' }}
      />
      <Stack.Screen
        name="FormDemo"
        component={FormDemo}
        options={{ title: 'Form 表单' }}
      />
      <Stack.Screen
        name="ProjectCardDemo"
        component={ProjectCardDemo}
        options={{ title: 'ProjectCard 项目卡片' }}
      />
      <Stack.Screen
        name="BadgeDemo"
        component={BadgeDemo}
        options={{ title: 'Badge 徽标' }}
      />
      <Stack.Screen
        name="EmptyDemo"
        component={EmptyDemo}
        options={{ title: 'Empty 空状态' }}
      />
      <Stack.Screen
        name="ImageDemo"
        component={ImageDemo}
        options={{ title: 'Image 图片' }}
      />
      <Stack.Screen
        name="FileUploadDemo"
        component={FileUploadDemo}
        options={{ title: 'Uploader 文件上传' }}
      />
      <Stack.Screen
        name="CalendarDemo"
        component={CalendarDemo}
        options={{ title: 'Calendar 日历' }}
      />
      <Stack.Screen
        name="MapDemo"
        component={MapDemoScreen}
        options={{ title: '地图示例' }}
      />
      <Stack.Screen
        name="SwitchDemo"
        component={SwitchDemo}
        options={{ title: 'Switch 开关' }}
      />
      <Stack.Screen
        name="DropdownMenuDemo"
        component={DropdownMenuDemo}
        options={{ title: 'Dropdown Menu 下拉菜单' }}
      />
      <Stack.Screen
        name="WatermarkCameraDemo"
        component={WatermarkCameraDemo}
        options={{ title: '水印相机' }}
      />
    </Stack.Navigator>
  );
};
