import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import css from "./AlignPlugin.module.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $getSelection, $isRangeSelection, FORMAT_ELEMENT_COMMAND, LexicalEditor } from "lexical";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import { FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight, FormatListBulleted, FormatListNumbered } from "@mui/icons-material";
type AlignTypes = 'left' | 'center' | 'right' | 'justify';

type AlignStyleType = {
  type:AlignTypes,
  title:string,
  logo:OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
};

const AlignPlugin = (prop: {editor:LexicalEditor}):JSX.Element => {
  const { editor } = prop;

  const AlignStyle:AlignStyleType[] = [
    {type:'right', title:"Unordered Align", logo:FormatAlignRight}, 
    {type:'center', title:"Ordered Align", logo: FormatAlignCenter}, 
    {type:'left', title:"Unordered Align", logo:FormatAlignLeft}, 
    {type:'justify', title:"Unordered Align", logo:FormatAlignJustify}, 
  ];


  const onClick = (e:React.MouseEvent, type:AlignTypes) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
  }

  const Align = (prop: AlignStyleType) =>( 
    <div 
        title={prop.title}
        className={css.icon}
        onClick={(e) => onClick(e, prop.type) }>
        <prop.logo className={css.svg}/>
    </div>
  )
  
  return (
    <div className={css.list_class}>
      {
        AlignStyle.map(({type, title, logo}) => <Align key={type} type={type} title={title} logo={logo}/>)
      }
    </div>
  );
};

export default AlignPlugin;
