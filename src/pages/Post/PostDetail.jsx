import { Link, useLoaderData } from "react-router-dom";
import Comments from "@/archive/singles/Comments";
import { EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "@/constants/tipTapExtensions";
import { useEffect } from "react";
import ActionButton from "@/components/ui/Button/ActionButton";

function PostDetail() {
    const loaderData = useLoaderData();
    console.log(loaderData?.data)
    const {
        id, title, post, status, published_at, created_at, updated_at, deleted_at, is_blocked, is_deleted, author, tag_names
    } = loaderData.data;

    const postedDate = new Date(published_at).toLocaleString('ru-RU')
    const tags = ["test", "demo", "post"]

    const editor = useEditor({
      extensions: extensions,
      content: post,
      editable: false, // Только для чтения!
    });

    useEffect(() => {
        if (editor && post) {
            editor.commands.setContent(post);
        }
    }, [editor, post]);

    return (
        <div className="flex flex-col rounded-[12px] bg-[#202020ff] w-200 shadow-simple-post">
            <div className="flex flex-col gap-3 p-6 pb-0">
                <nav className="flex flex-row justify-between">
                    <Link to={"/"}
                        className="font-lato text-[#828282ff] text-[12px] font-[400]">
                            вернуться назад</Link>
                    <Link to={"/post/1"}
                        className="flex items-center gap-2 font-lato text-[#828282ff] text-[12px] font-[400]">
                            поделиться
                            <img className="h-3 w-3" src="../src/assets/images/share.svg" alt="" /></Link>
                </nav>
                <h6 className="font-roboto text-white text-[29px] font-[600]">
                    {title}</h6>
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
                    <ActionButton variant={is_blocked ? 'disabled' : 'primary'}>
                        Редактировать
                    </ActionButton>
                </div>
                <article className="flex flex-col gap-5">
                    {/* <p className="font-roboto text-[#d2d2d2ff] text-[14px] leading-[21px] font-[400]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.
                    </p>
                    <p className="font-roboto text-[#d2d2d2ff] text-[14px] leading-[21px] font-[400]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.
                    </p>
                    <img className="rounded-t-md"
                        src="../src/assets/images/post_detail_image.png" alt="" />
                    <p className="font-roboto text-[#d2d2d2ff] text-[14px] leading-[21px] font-[400]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.
                    </p> */}
                    
                </article>
            </div>
            <EditorContent editor={editor}/>
            <div className="flex flex-col gap-3 p-6 rounded-b-md">
                <section className="flex flex-col gap-4">
                    <h6 className="font-roboto text-white text-[15px] font-medium">Интересно почитать</h6>
                    <div>
                        <ul className="grid grid-rows-2 grid-cols-2 gap-2">
                            <li className="flex flex-col">
                                <Link className="font-roboto text-[#f3ea2bff] text-[14px] leading-[21px] font-medium">
                                    Как я сходил на FrontEnd Conf 2021
                                </Link>
                                <span className="font-lato text-[#828282ff] text-[12px] font-[400]">21.06.2020</span>
                            </li>
                            <li className="flex flex-col">
                                <Link className="font-roboto text-[#f3ea2bff] text-[14px] leading-[21px] font-medium">
                                    Как писать код быстро и  ...
                                </Link>
                                <span className="font-lato text-[#828282ff] text-[12px] font-[400]">21.06.2020</span>
                            </li>
                            <li className="flex flex-col">
                                <Link className="font-roboto text-[#f3ea2bff] text-[14px] leading-[21px] font-medium">
                                    Купил новый ноутбук за 150 000 руб
                                </Link>
                                <span className="font-lato text-[#828282ff] text-[12px] font-[400]">21.06.2020</span>
                            </li>
                            <li className="flex flex-col">
                                <Link className="font-roboto text-[#f3ea2bff] text-[14px] leading-[21px] font-medium">
                                    Купил новый ноутбук за 150 000 руб
                                </Link>
                                <span className="font-lato text-[#828282ff] text-[12px] font-[400]">21.06.2020</span>
                            </li>
                        </ul>
                    </div>
                </section>
                <hr className='border-1 px-6 my-7 border-[#1c1c1cff]' />
                <section className="flex flex-col gap-4">
                    <h6 className="font-roboto text-white text-[15px] font-medium">
                        Обсуждение</h6>
                    <form className="flex flex-col gap-3 items-start" method="POST">
                        <textarea type="text" id="#comment" name="comment" placeholder="Текст комментария"
                            className='resize-y font-roboto placeholder:text-[#ffffff37] text-[#d2d2d2ff] text-[14px] font-normal w-full border-b-1 border-[#3f3f3fff] focus:outline-none'/>
                        <button className="w-[91px] h-[30px] bg-[#3137c9ff] rounded-md font-roboto text-[#ffffffff] text-[12px] font-normal"
                            type="button">Отправить</button>
                    </form>
                    <Comments/>
                </section>
                
            </div>
        </div>
    )
}

export default PostDetail
