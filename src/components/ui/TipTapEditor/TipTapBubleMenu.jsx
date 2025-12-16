import { useCallback } from 'react'
import styles from './TipTapEditorToolbar.module.css'
import { BubbleMenu } from '@tiptap/react/menus'

function TipTapBubleMenu({ editor, editorState }) {
  const variants = {
    primary: `${styles.toolbar}  ${styles.primary}`
  }
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }
  return (
    <BubbleMenu editor={editor}>
      <div className={`sticky ${styles.toolbar}`}>
        <section className={styles.formatPanel}>
          <button
            title='Жирный'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState.canBold}
            className={`${editorState.isBold ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
            <strong>Ж</strong>
          </button>
          <button
            title='Курсив'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editorState.canItalic}
            className={`${editorState.isItalic ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
            <i>К</i>
          </button>
          <button
            title='Зачеркнутый'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editorState.canStrike}
            className={`${editorState.isStrike ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
            <s>З</s>
          </button>
          <button
            title='Код'
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editorState.canCode}
            className={`${editorState.isCode ? `${styles.isActive}` : ''} ${variants.primary}`}
            >
            <code className={styles.codeBlock}>КОД</code>
          </button>
        </section>
      </div>
    </BubbleMenu>
  )
}

export default TipTapBubleMenu;
