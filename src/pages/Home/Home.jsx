import styles from './Home.module.css'

import telegramImg from '@assets/icons/telegram.svg'

import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";

// import Stories from "./Home/HomePage/Stories";
import AddPost from "@/archive/HomePage/AddPost";
import SimplePost from "@/archive/HomePage/SimplePost";
import VideoPost from "@/archive/HomePage/VideoPost";
import NormalPost from "@/archive/HomePage/NormalPost";
import PostPreview from "../Post/PostPreview";
import PageNav from "@/archive/HomePage/PageNav";
import { useEffect } from 'react';
import Title from '@/components/ui/Label/Title';
import Span from '@/components/ui/Label/Span';
import ActionButton from '@/components/ui/Button/ActionButton';
// import UserList from "./User/UserList";
// import WheelContainer from "../components/ui/Wheel/WheelContainer";

function Home() {
  const navigate = useNavigate();
  let loaderData = useLoaderData();
  // console.log(loaderData?.data[0])
  const id = 1;
  const title = 'title';
  const post = 'post';
  const published_at = '2025-12-12';
  if (loaderData?.data?.length) {
    const {
      id, title, post, status, published_at, created_at, updated_at, deleted_at, is_blocked, is_deleted, author, tag_names
    } = loaderData.data[0];
  } else {
    loaderData = { data: [{ id, title, post, published_at }] }
  }

  const hasToken = localStorage.getItem('auth:accessToken') || localStorage.getItem('auth:guestToken')
  // const { setUserId, accessToken } = useGlobalState();
  // const { user } = useLoaderData.data;

  // useEffect(() => {
  //   setUserId(user.pk)
  // }, [accessToken])
  // useEffect(() => {
  //   if (!hasToken) {
  //     navigate('/auth/login');
  //   }
  // }, [hasToken, navigate])
  

  return (
    <div className={styles.home}>
        {/* <main className="flex flex-col w-full items-center max-w-150"> */}
        {/* <main className="flex flex-col gap-7 items-center"> */}
        <main className="flex flex-col justify-center items-center">
          <Title>Манифест вашего преображения</Title>
          <ul className={styles['ul']}>
            <li className={styles['li']}>Дорогой друг!

Ты открыл дверь в пространство, где мечты обретают форму, а цели — реальность. Это приложение — не просто инструмент. Это твой персональный проводник в мир безграничных возможностей, где каждый шаг приближает тебя к тому, что ты действительно хочешь достичь.

Почему именно сейчас?
Потому что:

Время не ждёт. Каждая минута промедления — упущенный шанс.

{/* Ты достоин большего. В тебе скрыт потенциал, о котором ты, возможно, даже не подозреваешь. */}

Препятствия — лишь иллюзия. То, что кажется непреодолимым, становится шагом на пути к величию.

Что это приложение даст тебе?
Ясность цели
Ты перестанешь блуждать в тумане сомнений. Мы поможем сформулировать твои истинные желания и превратить их в чёткий план действий.
Систему роста
Никаких хаотичных попыток. Только выверенные методики, адаптированные под твой темп, стиль и особенности.
Невидимую поддержку
Когда силы на исходе, а мотивация гаснет, приложение напомнит: «Ты сильнее, чем думаешь».
Измеряемый прогресс
Каждый маленький шаг будет зафиксирован. Ты увидишь, как из кирпичиков ежедневных усилий складывается здание твоей новой жизни.
Мудрость веков
В основе приложения — синтез лучших практик менторства, психологии и нейронауки. Это опыт поколений, упакованный в удобный интерфейс.
Как это работает?
Честность. Ты честно отвечаешь на вопросы — мы честно показываем твой реальный потенциал.

Последовательность. Маленькие действия каждый день создают гигантские результаты.

Гибкость. План подстраивается под тебя, а не наоборот.

Осознанность. Ты не просто выполняешь задачи — ты понимаешь, почему это важно.

Твое обещание себе
Сегодня ты делаешь выбор:

Остаться в зоне комфорта — или шагнуть в неизвестность, где тебя ждёт лучшая версия себя.

Жаловаться на обстоятельства — или взять ответственность за свою судьбу.

Мечтать — или действовать.

Это приложение — твой союзник. Но победа зависит только от тебя.

Начнём?
Зарегистрируйся или войди как Гость, чтобы посмотреть приложение изнутри.
Заполни профиль и резюме без страха и притворства. Ведь мы гарантируем безопасность данных.
Сделай первый шаг — даже если он кажется крошечным.
Помни:

Ты не один. Миллионы людей прошли этот путь до тебя.

Ошибки — часть процесса. Каждая неудача — это данные для корректировки курса.

Результат неизбежен. Если ты не остановишься.

Ты стоишь на пороге перемен. Вдохни глубже. Нажми <Link to={"/auth/registration"}><ActionButton >Зарегистрироваться</ActionButton></Link> и сделай первый шаг к жизни, о которой всегда мечтал.

Твой потенциал безграничен.
Твоё время — сейчас.
Твой путь начинается здесь.</li></ul>
            {/* <Stories></Stories>
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
              ></NormalPost> */}
        </main>
        <footer className="flex flex-col my-5 py-5 gap-2 justify-center items-center max-w-150">
            {/* <PageNav></PageNav> */}
            <Link to={"/privacy"}>
              <Span variant='primary'>Политика конфиденциальности</Span>
            </Link>
            <Link to={"/feedback"}>
              <Span variant='primary'>Форма обратной связи</Span>
            </Link>
            <div aria-label='contacts' className='flex flex-col gap-2 items-center'>
              <Link className="flex flex-row gap-2 items-center" to={"https://t.me/skillcrafts_official"}>
                <img className='w-4' src={telegramImg} alt="" />
                <Span variant='primary'>Telegram</Span>
              </Link>
              <Span variant='secondary'>Designed by SkillCrafts.Ru</Span>
            </div>
        </footer>
    </div>
  );
}

export default Home;