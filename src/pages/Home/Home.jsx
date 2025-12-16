import { Link, useLoaderData } from "react-router-dom";
import { ROUTES } from "@/constants";

// import Stories from "./Home/HomePage/Stories";
import AddPost from "@/archive/HomePage/AddPost";
import SimplePost from "@/archive/HomePage/SimplePost";
import VideoPost from "@/archive/HomePage/VideoPost";
import NormalPost from "@/archive/HomePage/NormalPost";
import PostPreview from "../Post/PostPreview";
import PageNav from "@/archive/HomePage/PageNav";
// import UserList from "./User/UserList";
// import WheelContainer from "../components/ui/Wheel/WheelContainer";

function Home() {
  let loaderData = useLoaderData();
  // console.log(loaderData?.data[0])
  const id = 1;
  const title = 'title';
  const post = 'post';
  const published_at = '2025-12-12';
  if (loaderData?.data.length) {
    const {
      id, title, post, status, published_at, created_at, updated_at, deleted_at, is_blocked, is_deleted, author, tag_names
    } = loaderData.data[0];
  } else {
    loaderData = { data: [{ id, title, post, published_at }] }
  }
  // const { setUserId, accessToken } = useGlobalState();
  // const { user } = useLoaderData.data;

  // useEffect(() => {
  //   setUserId(user.pk)
  // }, [accessToken])

  return (
    <div className="">
        {/* <main className="flex flex-col w-full items-center max-w-150"> */}
        <main className="flex flex-col gap-7 items-center w-200">
            {/* <Stories></Stories> */}
            <PostPreview
              poster=""
              title={title}
              textPreview={post}
              tags={["test", "demo", "post"]}
              postedDate={new Date(published_at).toLocaleString('ru-RU')}
              linkName="читать"
              linkTo={`${ROUTES.POSTS.LIST}${id}`}
              post={loaderData.data[0]}
              />
            <AddPost></AddPost>
            <SimplePost></SimplePost>
            <VideoPost></VideoPost>
            <NormalPost
              poster="src/assets/images/Rectangle 5-1.png"
              title="Как я сходил на FrontEnd Conf 2021"
              textPreview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat."
              tags={["создание сайтов", ]}
              linkName="читать"
              linkTo="/post/1"
              ></NormalPost>
        </main>
        <footer className="max-w-150">
            <PageNav></PageNav>
        </footer>
    </div>
  );
}

export default Home;