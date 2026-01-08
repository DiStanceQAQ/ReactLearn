import { createIconSet } from "react-native-vector-icons";
import fmyIconJson from "../assets/fmySimpleIcon/iconfont.json";

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

const glyphMap = buildGlyphMap(fmyIconJson);
const fontFamily = fmyIconJson.font_family || "fmy-simple-basic";
const fontFile = "fmy-iconfont.ttf";

const FmyIcon = createIconSet(glyphMap, fontFamily, fontFile);

export default FmyIcon;
