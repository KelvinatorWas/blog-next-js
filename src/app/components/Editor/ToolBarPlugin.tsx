import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import css from "./Editor.module.css";
import HeadingPlugin from "./plugins/HeaderPlugin/HeaderPlugin";
import MyListPlugin from "./plugins/ListPlugin/ListPlugin";
import AlignPlugin from "./plugins/AlignPlugin/AlignPlugin";
import StylePlugin from "./plugins/StylePlugin/StylePlugin";
import FontSizePlugin from "./plugins/FontSizePlugin/FontSizePlugin";

const ToolBarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  
  return ( 
    <div className={css.toolbar_class}>
      <HeadingPlugin editor={editor}/>
      <StylePlugin editor={editor}/>
      <MyListPlugin editor={editor}/>
      <AlignPlugin editor={editor}/>
      <FontSizePlugin editor={editor}/>
    </div>
  )
}

export default ToolBarPlugin;
