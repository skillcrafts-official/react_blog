import Title from "../components/ui/Label/Title"
import PortfolioItem from "../components/Portfolio/PortfolioItem"

function Portfolio() {
    return (
        <div>
            <Title>Мои работы</Title>
            <div className="flex flex-col gap-7">
                <PortfolioItem
                    poster="/src/assets/images/Rectangle 21-1.png"
                    title="altermono.com"
                    note="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat."
                    tags={ ["дизайн", "создание сайтов", "SMM"] }
                    linkTo="https://ya.ru"
                    ></PortfolioItem>
                <PortfolioItem
                    poster="/src/assets/images/Rectangle 21.png"
                    title="codedoco.com"
                    note="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. "
                    tags={ ["дизайн", "создание сайтов", "SMM"] }
                    linkTo="https://ya.ru"
                    ></PortfolioItem>
            </div>
        </div>
    )
}

export default Portfolio
