import css from "./StylePlugin.module.css";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, LexicalEditor, TextFormatType } from "lexical";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { Code, FormatBold, FormatItalic, FormatStrikethrough, FormatUnderlined, Highlight, Subscript, Superscript } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import { classComb } from "@/utils/ClassComb";

type StyleType = {
  type:TextFormatType,
  title:string,
  logo:OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
  state: [boolean, Dispatch<SetStateAction<boolean>>]
};

const StylePlugin = (prop: {editor:LexicalEditor}):JSX.Element => {
  const { editor } = prop;

  const AllStyles:StyleType[] = [
    {type:'bold', title:"Bold", logo:FormatBold, state:useState(false)}, 
    {type:'italic', title:"Italic", logo:FormatItalic, state:useState(false)}, 
    {type:'underline', title:"Underline", logo:FormatUnderlined, state:useState(false)}, 
    {type:'strikethrough', title:"Strikethrough", logo:FormatStrikethrough, state:useState(false)}, 
    {type:'code', title:"Code", logo:Code, state:useState(false)}, 
    {type:'superscript', title:"Superscript", logo:Superscript, state:useState(false)}, 
    {type:'subscript', title:"Subscript", logo:Subscript, state:useState(false)},
    {type:'highlight', title:"Highlight", logo:Highlight, state:useState(false)}, 
  ];


  const onClick = (e:React.MouseEvent, setState:Dispatch<SetStateAction<boolean>>, type:TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);

    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        setState(selection.hasFormat(type));
      }
    });
  };

  const Style = (prop: StyleType) =>( 
    <div 
        title={prop.title}
        className={classComb(css.icon, prop.state[0] ? css.active : "")}
        onClick={(e) => onClick(e, prop.state[1], prop.type) }>
        <prop.logo className={classComb(css.svg, prop.state[0] ? css.svgActive : "")}/>
    </div>
  )

  return (
    <div className={css.list_class}>
      {
        AllStyles.map(({type, title, logo, state}) => <Style key={type} type={type} title={title} logo={logo} state={state}/>)
      }
    </div>
  );
};

export default StylePlugin;
