import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";

type Props = {
  visibility?: boolean;
  children?: React.ReactNode;
};

export type NormalComponentRef = {
  /** 强制控制显示/隐藏；传 null 恢复为跟随 props.visibility */
  setShowComponent: (value: boolean | null) => void;
  /** 当前内部覆盖状态；null 表示未覆盖，跟随 props */
  showComponent: boolean | null;
  /** 便捷方法，清除覆盖状态 */
  reset: () => void;
};

function NormalComponentInner({ visibility = true, children }: Props, ref: React.Ref<NormalComponentRef>) {
  // null 表示未覆盖，跟随 props；true/false 表示强制显示/隐藏
  const [overrideVisible, setOverrideVisible] = useState<boolean | null>(null);

  const showComputed = useMemo(
    () => (overrideVisible !== null ? overrideVisible : visibility),
    [overrideVisible, visibility]
  );

  useImperativeHandle(
    ref,
    () => ({
      setShowComponent: setOverrideVisible,
      showComponent: overrideVisible,
      reset: () => setOverrideVisible(null)
    }),
    [overrideVisible]
  );

  if (!showComputed) return null;
  return <>{children}</>;
}

const NormalComponent = forwardRef<NormalComponentRef, Props>(NormalComponentInner);

export default NormalComponent;
