import { createIconSet } from "react-native-vector-icons";
import menuIconJson from "../assets/menuIcon/iconfont.json";

function buildGlyphMap(iconJson) {
  const prefix = iconJson.css_prefix_text || "";
  return (iconJson.glyphs || []).reduce((map, glyph) => {
    if (!glyph || !glyph.font_class) {
      return map;
    }
    const name = `${prefix}${glyph.font_class}`;
    map[name] = glyph.unicode_decimal;
    return map;
  }, {});
}

const glyphMap = buildGlyphMap(menuIconJson);
const fontFamily = menuIconJson.font_family || "menu";
const fontFile = "menu-iconfont.ttf";

const MenuIcon = createIconSet(glyphMap, fontFamily, fontFile);

export default MenuIcon;
