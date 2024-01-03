import Draft, { EditorState, Editor, RichUtils, ContentBlock, Modifier} from "draft-js";
import { useState } from "react";
import css from './Editor.module.css'
import { FormatBold, FormatItalic, FormatUnderlined, FormatStrikethrough, FormatOverline, Code, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, FormatAlignJustify } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

import React from "react";
import { classComb } from "@/utils/ClassComb";

type InlineType = {
  name:string,
  logo:OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
  title:string;
}

type FontSize = {
  [key:string]:{fontSize:string}
}

const Inlines:InlineType[] = [
  {name:"BOLD", logo:FormatBold, title:"Bold"},
  {name:"ITALIC", logo:FormatItalic, title:"Italic"},
  {name:"UNDERLINE", logo:FormatUnderlined, title:"Under line"},
  {name:"STRIKETHROUGH", logo:FormatStrikethrough, title:"Line thorugh"},
  {name:"CODE", logo:Code, title:"Monospace"},
];

const Alignments:InlineType[] = [
  {name:"JUSTIFY", logo:FormatAlignJustify, title:"Right"},
  {name:"RIGHT", logo:FormatAlignRight, title:"Justify"},
  {name:"center", logo:FormatAlignCenter, title:"Center"},
  {name:"LEFT", logo:FormatAlignLeft, title:"Left"},
];

//const inlineStyles = [
//  { label: "B", style: "BOLD" },
//  { label: "I", style: "ITALIC" },
//  { label: "U", style: "UNDERLINE" },
//  { label: "<strike>S</strike> ", style: "STRIKETHROUGH" },
//  { label: "I am your header", style: "FONT_SIZE_30" }
//];


const sizes = [10, 12, 16, 18, 24, 32, 38, 64];

const FONT_SIZE = sizes.reduce((map, size) => {
  map[`FONT_SIZE_${size}` as string] = { fontSize: `${size}px` };
  return map;
}, {} as FontSize);

const customStyleMap:{ [key: string]: { textAlign?: 'left' | 'center' | 'right' | 'justify', textDecoration?:string, fontSize?:string} } = {
  STRIKETHROUGH: {
    textDecoration: "line-through"
  },
  ...FONT_SIZE,
  CENTER: {
    textAlign: 'center'
  }
};




const FontSizeChooser = ({ onFontSizeChange }: {onFontSizeChange:(num:number)=> void}) => {
  customStyleMap
  return (
    <select className={css.font_size} onChange={(e) => onFontSizeChange(Number(e.target.value))}>
      {sizes.map((size) => (
        <option key={size} value={size}>
          Size: {size}
        </option>
      ))}
    </select>
  );
};

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const myBlockStyleFn = (contentBlock:ContentBlock) => {
    const alignment = contentBlock.getType();

    console.log('Block Type:', alignment);
    if (alignment === 'CENTER') {
      return css.center;
    }

    return 'public-DraftStyleDefault-ltr'
  }

  const onEditorChange = (editorState:EditorState) => {
    setEditorState(editorState);
  };

  const onInlineClick = (style:string) => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const styleActive = (style:string) => {
    const currStyle = editorState.getCurrentInlineStyle();
    
    return currStyle.has(style);
  }
  
  const onAlignClick = (align:string) => {
    const newContentState = RichUtils.toggleBlockType(
      editorState, 'CENTER'
    );
    console.log(newContentState);
    
    setEditorState(newContentState);
  }

  const onFontSizeChange = (fontSize:number) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, `FONT_SIZE_${fontSize}`);
    onEditorChange(newEditorState);
  };


  return (
  <div className={css.wrapper_class}>

    <div className={css.settings_class}>
      {
        Inlines.map((inline, index) => (
          <div 
          key={index}
          title={inline.title}
          className={classComb(css.icon, styleActive(inline.name) ? css.active : "")}
          onClick={() => onInlineClick(inline.name)
          }>
            <inline.logo
              className={styleActive(inline.name) ? css.svgWhite : ""}
            />
          </div>
        ))
      }

      <div>
          <FontSizeChooser onFontSizeChange={onFontSizeChange} />
      </div>

      {
        Alignments.map((inline, index) => (
          <div 
          key={index}
          title={inline.title}
          className={css.icon}
          onClick={() => onAlignClick(inline.name)
          }>
            <inline.logo/>
          </div>
        ))
      }
    </div>
    <div className={css.textarea_class}>

    <Editor
      customStyleMap={customStyleMap}
      editorState={editorState}
      onChange={onEditorChange}
      blockStyleFn={myBlockStyleFn}
      
      />
    </div>
  </div>
  )
}

export default MyEditor