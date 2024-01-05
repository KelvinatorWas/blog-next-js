import { $INTERNAL_isPointSelection, $getSelection, LexicalEditor, TextFormatType } from "lexical";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { $patchStyleText } from "@lexical/selection";
import css from './FontSizePlugin.module.css'

const FONT_SIZES: [string, string][] = [
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
] as const;

const FontSizePlugin = (prop: {editor:LexicalEditor}):JSX.Element => {
  const [size, setSize] = useState('16px');
  const { editor } = prop;

  const onClick = (e:ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);

    editor.update(() => {
      const selection = $getSelection(); 
      if($INTERNAL_isPointSelection(selection)) {
        $patchStyleText(selection, {
          ["font-size"]: e.target.value,
        });
      };
    });
  };

  const Style = (prop: {size:string, title:string}) => <option value={prop.title}>{prop.size}</option>;
  
  return (
    <div className={css.size_class}>
      <select className={css.selector} onChange={(e) => onClick(e)} value={size}>
        {
          FONT_SIZES.map(([size,title]) => <Style key={title} size={size} title={title}/>)
        }
      </select>
    </div>
  );
};

export default FontSizePlugin;
