import {useState} from "react";

import { CourseContent } from "../../../components";
function Article() {
  const [data, setData] = useState({
    article: {
      title: "Html basic ",
      content: ` que, ad provident
      incidunt tenetur. Esse aperiam harum nulla omnis consec adipisci,
      unde reprehenderit consequuntur repudiandae mollitia, amet
      distinctio odio vero quam veniam! Dignissimos id quam, iusto
      veritatis impedit ad deserunt laudantium? Ex consequatur beatae
      hic, fugiat reprehenderit molestiae illo ad deserunt assumenda est
      quo, nobis doloremque, iste enim maxime asperiores dignissimos. Id
      ad saepe deleniti est porro, atque commodi libero fugit dolore
      dolorem, minima suscipit soluta impedit! Accusantium repellat
      tempora repudiandae quos atque asperiores sapiente exercitationem
      cum quidem fugit excepturi laborum animi neque incidunt numquam
      corrupti eius nam sunt alias, natus a reprehenderit officiis unde
      eaque! Ab beatae enim eos ipsa saepe rerum itaque? Assumenda nam
      quae, tempore, odit nobis nulla aliquid veritatis minus, velit
      eius ratione. Exercitationem vitae optio omnis illo dignissimos,
      hic laudantium officiis delectus accusamus recusandae doloremque
      expedita possimus eveniet ipsum praesentium, eos voluptate. Sed
      rerum quibusdam numquam quae perferendis iste debitis, ab
      exercitationem nam accusamus laborum   unde reprehenderit consequuntur
       repudiandae mollitia, amet   unde reprehenderit consequuntur repudiandae mollitia, amet
       distinctio odio vero quam veniam! Dignissimos id quam, iusto
       veritatis impedit ad deserunt laudantium? Ex consequatur beatae
       hic, fugiat reprehenderit molestiae illo ad deserunt assumenda est
       quo, nobis doloremque, iste enim maxime asperiores dignissimos. Id
       ad saepe deleniti est porro, atque commodi libero fugit dolore
       dolorem, minima suscipit soluta impedit! Accusantium repellat
       tempora repudiandae quos atque asperiores sapiente exercitationem
       cum quidem fugit excepturi laborum animi neque incidunt numquam
       corrupti eius nam sunt alias, natus a reprehenderit officiis unde
       eaque! Ab beatae enim eos ipsa saepe rerum itaque? Assumenda nam
       quae, tempore, odit nobis nulla aliquid veritatis minus, velit
       eius ratione. Exercitationem vitae optio omnis illo dignissimos,
       hic laudantium officiis delectus accusamus recusandae doloremque
       expedita possimus eveniet ipsum praesentium, eos voluptate. Sed
      distinctio odio vero quam veniam! Dignissimos id quam, iusto
      veritatis impedit ad deserunt laudantium? Ex consequatur beatae
      hic, fugiat reprehenderit molestiae illo ad deserunt assumenda est
      quo, nobis doloremque, iste enim maxime asperiores dignissimos. Id
      ad saepe deleniti est porro, atque commodi libero fugit dolore
      dolorem, minima suscipit soluta impedit! Accusantium repellat
      tempora repudiandae quos atque asperiores sapiente exercitationem
      cum quidem fugit excepturi laborum animi neque incidunt numquam
      corrupti eius nam sunt alias, natus a reprehenderit officiis unde
      eaque! Ab beatae enim eos ipsa saepe rerum itaque? Assumenda nam
      quae, tempore, odit nobis nulla aliquid veritatis minus, velit
      eius ratione. Exercitationem vitae optio omnis illo dignissimos,
      hic laudantium officiis delectus accusamus recusandae doloremque
      expedita possimus eveniet ipsum praesentium, eos voluptate. Sed.`,
      date: "1-1-2023",
    },
    courseContent: [
      {
        id: 1,
        topicTitle: " جحش براري",
        subTopics: [
          {
            id: 1,
            title: "webpack",
            items: [
              {
                id: 1,
                title: "video intro",
                order: 1,
                type: "video",
                complete: true,
              },
              {
                id: 2,
                title: "An Article",
                order: 2,
                type: "article",
                complete: true,
              },
              {
                id: 3,
                title: "An Quiz",
                order: 3,
                type: "quiz",
                complete: false,
              },
            ],
          },
          {
            id: 2,
            title: "يا ويل قلبي",
            items: [
              {
                id: 4,
                title: "A Lecture",
                order: 1,
                type: "video",
                complete: false,
              },
              {
                id: 5,
                title: "An Article",
                order: 2,
                type: "article",
                complete: false,
              },
              {
                id: 6,
                title: "A Quiz",
                order: 3,
                type: "quiz",
                complete: false,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        topicTitle: "لك ولييييي",
        subTopics: [
          {
            id: 3,
            title: "Topic level N",
            items: [
              {
                id: 7,
                title: "A Lecture",
                order: 1,
                type: "video",
                complete: false,
              },
              {
                id: 8,
                title: "An Article",
                order: 2,
                type: "article",
                complete: false,
              },
              {
                id: 9,
                title: "A Quiz",
                order: 3,
                type: "quiz",
                complete: false,
              },
            ],
          },
        ],
      },
      {
        id: 4,
        topicTitle: "الشغل اللاوي",
        subTopics: [
          {
            id: 3,
            title: "Topic level N",
            items: [
              {
                id: 7,
                title: "A Lecture",
                order: 1,
                type: "video",
                complete: false,
              },
              {
                id: 8,
                title: "An Article",
                order: 2,
                type: "article",
                complete: false,
              },
              {
                id: 9,
                title: "A Quiz",
                order: 3,
                type: "quiz",
                complete: false,
              },
            ],
          },
        ],
      },
    ],
  });
  return (
    <section className="w-full ">
      <div className=" flex  ">
        <div className="flex-1 flex justify-center ">
          <div>
            <div className="max-w-3xl w-full mx-auto p-[24px] bg-white shadow-lg rounded-lg overflow-hidden">
              <h1 className="text-3xl font-bold mb-6 border-b pb-4 dark:text-gray-800">
                {data.article.title}
              </h1>
              <div className="mb-6 overflow-y-auto custom-scrollbar h-96">
                <p className="text-gray-700 hover:text-blue-800 text-lg  leading-relaxed  transition duration-300">
                  {data.article.content}
                </p>
              </div>
              <div className="flex flex-row-reverse items-center border-t pt-4">
                <span className="text-accent font-medium italic font-serif">
                  {data.article.date}
                </span>
              </div>
            </div>
            <div className="ml-[510px] py-[20px]">
              <button className="flex justify-center items-center gap-[10px] px-[70px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">
                Completion Flag
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-secondary dark:bg-secondary-dark h-full w-[400px] transition-all duration-1000 ease-in-out-back">
            <CourseContent courseContent={data.courseContent} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Article;
