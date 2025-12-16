import styles from "./Resume.module.css";
import { Link, useLoaderData } from "react-router-dom";
// import ActionButton from "@/components/ui/Button/ActionButton";
// import Input from "@/components/ui/Input/Input";
// import Checkbox from "@/components/ui/Choice/Checkbox";
// import Title from "@/components/ui/Label/Title";
// import Textarea from "@/components/ui/Input/Textarea";
import Span from "@/components/ui/Label/Span";
// import { useEffect, useState } from "react";
// import { API_BASE_URL, API_DATA_WITH_MEDIA, API_ENDPOINTS } from "../../constants";
// import { useGlobalState } from "@/lib/providers/GlobalProvider";
// import WorkFormat from "@/features/profile/components/WorkFormat";
// import EducationLevel from "@/features/profile/components/EducationLevel";
// import { useResumeState } from "@/lib/providers/ResumeProvider";
import WorkResult from "@/features/resume/components/WorkResult";
// import VerticalWheelList from "@/components/ui/Wheel/VerticalWheelList";
import WorkLanguage from "@/features/resume/components/WorkLanguage";
import WorkExperience from "@/features/resume/components/WorkExperience";
import WorkSkill from "@/features/profile/components/WorkSkill";

function Resume() {
    // const { handleExperienceId } = useResumeState()
    const loaderData = useLoaderData();
    const resume = [...(loaderData?.data || [])];
    const workExperiences = resume[0].experiences
    // const workLanguages = resume[0].languages
    // const privacy = { ...(loaderData?.privacySettings?.data || {}) };

    // useEffect(() => {
    //     const handleLoaderData = async () => {
    //         handleExperienceId(workExperiences?.id || 0);
    //     }
    //     handleLoaderData();
    // }, [workExperiences, handleExperienceId])

    // console.log(workLanguages)
    return (
        <div className="flex flex-col gap-5">
            {/* // onSubmit={handleSubmit}
            // encType="multipart/form-data"> */}
            {/* <Title>Профиль</Title> */}
            
            <div className={styles.resume}>
                <section className={styles.first}>
                    <section className={styles.first}>
                        <Span variant="invert">Владение родными и инстранными языками</Span>
                        <WorkLanguage />
                    </section>
                    <Span variant="invert">Ваш опыт сотрудничества</Span>
                    {workExperiences.map((exp) => (
                        <div className="flex flex-col w-full h-fit gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
                            <WorkExperience
                                key={exp.id}
                                exp={exp}/>
                            {exp.results.map((res) => (
                                <WorkResult
                                    key={res.id}
                                    res={res}
                                    epxId={exp.id}/>
                            ))}
                        </div>
                    ))}
                    
                    
                </section>
                <section className={styles.third}>
                    <section className={styles.first}>
                        <Span variant="invert">Владение инструментами и технологиями</Span>
                        <WorkSkill />
                    </section>
                </section>
            </div>
        </div>
    )
}

export default Resume;
