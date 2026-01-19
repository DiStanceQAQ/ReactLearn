Component API guidelines (v0)
================================

Scope: align all custom components on naming, tokens, and style override patterns.

1) Theme tokens
- Colors: import from `constants/colors`.
- Tokens: import from `constants/theme` (`Theme.fontSize/lineHeight/spacing/radius/border/opacity/controlHeight/zIndex/shadow`).
- Default overlay opacity: `Theme.opacity.overlay`.
- Default rounding: `Theme.radius.md` or `Theme.radius.lg`.
- Default control height: `Theme.controlHeight.md`.

2) Naming and API shape
- Value/change: controlled props use `value` + `onChange(value)`.
- Disabled/readonly: `disabled` blocks focus/press; `readonly` shows value and allows press callbacks (`onPress`/`onClick`) without editing.
- Status: `error?: boolean`, `errorMessage?: string` (or `helperText` when non-error). Visual error state uses `error` for border/color; message uses `errorMessage`.
- Click behavior: `onClick` / `onPress` for tap actions; keep the verb consistent.
- Options: list-based inputs use `options` (array of `{ value, label }`) or reuse existing `optionItem` until migrated.
- Booleans: prefer positive names (`clearable`, `closable`, `overlay`, `round`).

3) Style override strategy
- Accept `style` / `contentStyle` / `overlayStyle` / `labelStyle` as `StyleProp` on outer/inner wrappers.
- Internals should rely on Theme tokens; avoid hard-coded literals.
- For global theming, swap `Theme` exports or inject via a theme provider later; keep per-component overrides non-breaking.

4) Interaction defaults
- Overlay click to close uses `closeOnClickOverlay` (default true).
- Focus/active states tint border with `Colors.primary`; disabled uses `Theme.opacity.disabled`.
- Word limits: show `current/max` only when `maxLength` provided.

5) Usage checklist
- Import tokens from `constants/theme`.
- Use consistent prop names per section 2.
- Expose style overrides per section 3.
- Write minimal inline comments only when behavior is non-obvious.
组件 API 指南 (v0)
==================

范围：统一所有自定义组件的命名、主题 Token 和样式覆盖模式。

1) 主题 Token
- 颜色：从 `constants/colors` 导入。
- Token：从 `constants/theme` 导入 (`Theme.fontSize/lineHeight/spacing/radius/border/opacity/controlHeight/zIndex/shadow`)。
- 默认遮罩透明度：`Theme.opacity.overlay`。
- 默认圆角：`Theme.radius.md` 或 `Theme.radius.lg`。
- 默认控件高度：`Theme.controlHeight.md`。

2) 命名和 API 结构
- 值/变化：受控属性使用 `value` + `onChange(value)`。
- 禁用/只读：`disabled` 阻止聚焦/按压；`readonly` 显示值并允许按压回调 (`onPress`/`onClick`) 但不允许编辑。
- 状态：`error?: boolean`，`errorMessage?: string` (非错误状态时使用 `helperText`)。视觉错误状态使用 `error` 控制边框/颜色；消息使用 `errorMessage`。
- 点击行为：`onClick` / `onPress` 用于点击操作；保持动词一致性。
- 选项：基于列表的输入使用 `options` (数组格式 `{ value, label }`) 或继续使用现有的 `optionItem` 直到迁移完成。
- 布尔值：倾向于使用正面名称 (`clearable`, `closable`, `overlay`, `round`)。

3) 样式覆盖策略
- 接受 `style` / `contentStyle` / `overlayStyle` / `labelStyle` 作为外部/内部包装器的 `StyleProp`。
- 内部实现应依赖主题 Token；避免硬编码的字面量。
- 对于全局主题化，可通过主题提供者后续注入，或替换 `Theme` 导出；保持按组件的覆盖不破坏性。

4) 交互默认值
- 点击遮罩关闭使用 `closeOnClickOverlay` (默认 true)。
- 聚焦/激活状态使用 `Colors.primary` 为边框着色；禁用状态使用 `Theme.opacity.disabled`。
- 字数限制：仅在提供 `maxLength` 时显示 `当前/最大`。

5) 使用检查清单
- 从 `constants/theme` 导入 Token。
- 按照第2节使用一致的属性名称。
- 按照第3节暴露样式覆盖。
- 仅在行为不明显时编写最少的内联注释。