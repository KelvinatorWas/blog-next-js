import css from "./StylePlugin.module.css";
import { $INTERNAL_isPointSelection, $getSelection, $isRangeSelection, $setSelection, FORMAT_TEXT_COMMAND, LexicalEditor, TextFormatType } from "lexical";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { Code, FormatBold, FormatItalic, FormatStrikethrough, FormatUnderlined, Highlight, Subscript, Superscript } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import { classComb } from "@/utils/ClassComb";
import { $getSelectionStyleValueForProperty, $patchStyleText } from "@lexical/selection";

type StyleType = {
  type:TextFormatType,
  title:string,
  logo:OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
  state: [boolean, Dispatch<SetStateAction<boolean>>]
};

const FONT_SIZE_OPTIONS: [string, string][] = [
  ['10px', '10px'],
  ['11px', '11px'],
  ['12px', '12px'],
  ['13px', '13px'],
  ['14px', '14px'],
  ['15px', '15px'],
  ['16px', '16px'],
  ['17px', '17px'],
  ['18px', '18px'],
  ['19px', '19px'],
  ['20px', '20px'],
];

const StylePlugin = (prop: {editor:LexicalEditor}):JSX.Element => {
  const { editor } = prop;

  // const [isBold, setIsBold] = useState(false);
  // const [isItalic, setIsItalic] = useState(false);
  // const [isUnderline, setisUnderline] = useState(false);
  // const [isStrike, setIsStrike] = useState(false);
  // const [isCode, setIsCode] = useState(false);
  // const [isSuper, setIsSuper] = useState(false);
  // const [isSub, setIsSub] = useState(false);
  // const [isHigh, setIsHigh] = useState(false);

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
        // setIsBold(selection.hasFormat('bold'));
        // setIsCode(selection.hasFormat('code'));
        // setIsHigh(selection.hasFormat('highlight'));
        // setIsItalic(selection.hasFormat('italic'));
        // setIsStrike(selection.hasFormat('strikethrough'));
        // setIsSub(selection.hasFormat('subscript'));
        // setisUnderline(selection.hasFormat('underline'));
        // setIsSuper(selection.hasFormat('superscript'));
      }
    });
    
    
  }

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
