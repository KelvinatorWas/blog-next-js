import css from './Editor.module.css'
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode } from '@lexical/rich-text';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ListItem, SvgIconTypeMap } from '@mui/material';
import { Code, FormatBold, FormatItalic, FormatStrikethrough, FormatUnderlined } from '@mui/icons-material';
import ToolBarPlugin from './ToolBarPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { $getRoot, $getSelection,  } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import {$generateHtmlFromNodes} from '@lexical/html';


type InlineType = {
  name:string,
  logo:OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
  title:string;
}

const Inlines:InlineType[] = [
  {name:"BOLD", logo:FormatBold, title:"Bold"},
  {name:"ITALIC", logo:FormatItalic, title:"Italic"},
  {name:"UNDERLINE", logo:FormatUnderlined, title:"Under line"},
  {name:"STRIKETHROUGH", logo:FormatStrikethrough, title:"Line thorugh"},
  {name:"CODE", logo:Code, title:"Monospace"},
];

const theme = {
  text: {
   bold: css.editorBold,
   underline: css.editorUnderline
  },
  heading: {
    h1: css.editorH1
  }
}

const onError = (error:Error) => {
  console.error(error);
}

const ToHTML = (props: {check:(state:string) => void}) => {
  const [editor] = useLexicalComposerContext();
  const {check} = props;
  useEffect(() => {
    editor.registerUpdateListener(() => {
      editor.update(() => {
        const selection = $getSelection();
        const t = editor.getRootElement()
        const htmlString = $generateHtmlFromNodes(editor, selection)
        if (t) check(t?.innerHTML);
      })
    })

  }, [check, editor]);

  return null;
}

const MyEditor = (prop: {setHTML: (str:string) => void}) => {

  const config = {
    namespace: 'editor',
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
    ]
  };
  

  return (
    <div className={css.wrapper_class}>
      <LexicalComposer initialConfig={config}>
        <ToolBarPlugin/>
        <RichTextPlugin
          contentEditable={<ContentEditable className={css.editor_class}/>}
          placeholder={<div className={css.placholder}>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
          
        />
        <HistoryPlugin />
        <ListPlugin/>
        <ToHTML check={(e) => prop.setHTML(e)}/>
      </LexicalComposer>
    </div>
  );
}

export default MyEditor