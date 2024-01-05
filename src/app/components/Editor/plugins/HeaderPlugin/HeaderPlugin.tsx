import css from "./HeaderPlugin.module.css";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { useState } from "react";

type HeadingTypes = 'h1' | 'h2' | 'h3' | 'h4';

type HeadingStyleType = {
  type:HeadingTypes,
  title:string,
};

const HeadingPlugin = (prop: {editor:LexicalEditor}):JSX.Element => {
  const [selectedElementKey, setSelectedElementKey] = useState(null);

  const { editor } = prop;

  const HeaderStyle:HeadingStyleType[] = [
    {type:'h1', title:"Header 1"}, 
    {type:'h2', title:"Header 2"}, 
    {type:"h3", title:"Header 3"}, 
    {type:"h4", title:"Header 4"},
  ];

  const onClick = (e:React.MouseEvent, type:HeadingTypes) => {
    editor.update(() => {
      const selection = $getSelection();
      
      if ($isRangeSelection(selection)){
        const anchor = selection.anchor.getNode();
        const element = anchor.getKey() === 'root' ? anchor : anchor.getTopLevelElementOrThrow(); 
        const elementKey = element.getKey();
        const elementDOM = editor.getElementByKey(elementKey);

        if (elementDOM !== null) {
          setSelectedElementKey(elementKey);
        }

        $setBlocksType(selection, () => $createHeadingNode(type));
        }
      }
    );
  };

  const Header = ({title, type}: {type:HeadingTypes, title:string}) =>( 
    <div 
        title={title}
        className={css.icon}
        onClick={(e) => onClick(e, type) }>
        {type.toUpperCase()}
    </div>
  )
  
  return (
    <div className={css.header_class}>
      {
        HeaderStyle.map(({type, title}) => <Header key={type} type={type} title={title}/>)
      }
    </div>
  );
};

export default HeadingPlugin;
