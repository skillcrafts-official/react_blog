import defaultPoster from '../../assets/images/defaults/default-wallpaper-secondary.svg'
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { extensions } from "../../constants/tipTapExtensions";
import { useGlobalState } from '../../components/GlobalProvider';

function PostPreview({ poster, title, textPreview, postedDate, tags, linkName, linkTo, post }) {
    const { setSelectedPost } = useGlobalState();
    const [postPreview, setPostPreview] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const editorRef = useRef(null);

    const editor = useEditor({
      extensions: extensions,
      content: textPreview,
      editable: false, // Только для чтения!
      immediately: false,
    });

    useEffect(() => {
        if (isMounted && editorRef.current && !editor) {
            if (editor && textPreview) {
                editor.commands.setContent(textPreview);
            }
            const getTextPreview = () => {
                const view = editor.view;
                const firstParagraph = view.dom.querySelector('p');

                setPostPreview(firstParagraph?.textContent || firstParagraph?.innerText || '');
            };
            getTextPreview();
        }
    }, [isMounted, editor, textPreview]);    

    if (!isMounted) {
        return <div>Загрузка редактора...</div>;
    }

    return (
        <div className="flex flex-col w-full rounded-t-[12px]">
            <div className="flex flex-col gap-3 bg-[#202020ff] rounded-[12px] shadow-simple-post">
                <img className="rounded-t-[12px]"
                    src={poster || defaultPoster} alt="poster" />
                <div className='flex flex-col gap-3 p-6'>
                    <h6 className="font-roboto text-white text-[18px] font-[500]">
                        {title}</h6>
                    <p className="font-roboto text-[#d2d2d2ff] font-[400] text-[14px] leading-[21px] tracking-[0%]">
                        {postPreview.length > 300 ? `${postPreview.slice(0, 300)}...` : postPreview}
                    </p>
                    <div className="flex md:flex-row flex-col gap-3 justify-between">
                        <div className="flex flex-row flex-wrap gap-x-3 items-center">
                            <div className="flex flex-row flex-wrap gap-x-3 items-center">
                                <span className="font-lato text-[#828282ff] text-[12px] font-[400]">
                                    опубликовано - {postedDate}</span>
                                    <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                            </div>
                            {tags.map( (tag) => (
                                <Link
                                    className="font-roboto text-[#107effff] text-[12px] hover:font-black">
                                    {tag}</Link>
                            ))}
                        </div>
                        <Link to={linkTo}
                            onClick={() => setSelectedPost(post)}
                            className="font-roboto text-[#107effff] text-[14px] font-[400] hover:font-black">
                                {linkName}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPreview
