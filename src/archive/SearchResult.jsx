import { useLocation, useSearchParams } from "react-router-dom"
import Input from "@/components/ui/Input/Input"
import Title from "@/components/ui/Label/Title"

import NormalPost from "./HomePage/NormalPost"
import { useState } from "react"

function SearchResult() {
    const [searchResult, setSearchResult] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    function handleChange(event) {
        setSearchParams({ q: event.target.value })
    }
    
    function handleKeyDown(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            if (searchParams.get('q')) {
                setSearchResult(true)
            } else {
                setSearchResult(false)
            }
        }
    }

    return (
        <div>
            <form className="min-w-30 mx-2 "
                method="GET">
                {/* action="localhost:8000"> */}
                <Input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Поиск по блогу"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />        
            </form>
            {searchResult && (
                <>
                <Title>Результаты поиска {`“${searchParams.get('q')}”`}</Title>
                <NormalPost
                    title="Как писать код быстро и безболезненно?"
                    textPreview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat."
                    tags={["создание сайтов", "продвижение видео"]}
                    linkName="перейти"
                    linkTo="/post/1"
                    ></NormalPost>
                <NormalPost
                    title="Купил новый ноутбук за 150 000 руб"
                    tags={["создание сайтов", "продвижение видео"]}
                    linkName="перейти"
                    linkTo="/post/1"
                    ></NormalPost>
                <NormalPost
                    title="Как писать код быстро и безболезненно?"
                    textPreview="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat."
                    tags={["создание сайтов", "продвижение видео"]}
                    linkName="перейти"
                    linkTo="/post/1"
                    ></NormalPost>
                <NormalPost
                    title="Купил новый ноутбук за 150 000 руб"
                    tags={["создание сайтов", "продвижение видео"]}
                    linkName="перейти"
                    linkTo="/post/1"
                    ></NormalPost>
                </>
                )}
        </div>
    )
}

export default SearchResult
