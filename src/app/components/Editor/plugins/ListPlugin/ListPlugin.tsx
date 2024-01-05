import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import css from "./ListPlugin.module.css";
import { LexicalEditor } from "lexical";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { FormatListBulleted, FormatListNumbered } from "@mui/icons-material";

type ListTypes = 'ol' | 'ul';

type ListStyleType = {
  type:ListTypes,
  title:string,
  logo:OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  },
};

const MyListPlugin = (prop: {editor:LexicalEditor}):JSX.Element => {
  const { editor } = prop;

  const ListStyle:ListStyleType[] = [
    {type:'ol', title:"Ordered list", logo:FormatListNumbered}, 
    {type:'ul', title:"Unordered list", logo:FormatListBulleted}, 
  ];

  const onClick = (e:React.MouseEvent, type:ListTypes) => {
    if(type === 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const List = (prop: ListStyleType) =>( 
    <div 
        title={prop.title}
        className={css.icon}
        onClick={(e) => onClick(e, prop.type) }>
        <prop.logo className={css.svg}/>
    </div>
  );
  
  return (
    <div className={css.list_class}>
      {
        ListStyle.map(({type, title, logo}) => <List key={type} type={type} title={title} logo={logo}/>)
      }
    </div>
  );
};

export default MyListPlugin;
