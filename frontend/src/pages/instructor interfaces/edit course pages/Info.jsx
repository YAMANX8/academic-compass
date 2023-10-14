import { useState, useRef } from "react";
import {
  BsCaretDownSquareFill as DownSquareFill,
  BsPlus as Add,
  BsCloudUpload as Upload,
} from "react-icons/bs";

const Info = () => {
  const photo = useRef();
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    level: "",
    type: "",
    description: "",
    whoFor: ["", "", ""],
    whatLearn: ["", "", ""],
    prerequisites: ["", "", ""],
    thumbnail: "",
    isActive: false,
  });
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [list, setList] = useState({
    levels: [
      {
        id: 1,
        title: "Beginner",
      },
      {
        id: 2,
        title: "Intermediate",
      },
      {
        id: 3,
        title: "Expert",
      },
    ],
    types: [
      {
        id: 1,
        title: "project based",
      },
      {
        id: 2,
        title: "beginner|advanced",
      },
      {
        id: 3,
        title: "observational learn",
      },
    ],
  });
  const levels = ["Beginner", "Intermediate", "Expert"];
  const project = ["project based", "beginner|advanced", "observational learn"];
  const [selectedProject, setSelectedProject] = useState("");
  const toggleDropdown = (field) => {
    if (activeField === field) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
      setActiveField(field);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  console.table(data);
  // styles
  const headings = `text-[32px] font-bold tracking-tight text-dark dark:text-light transition-all duration-1000 ease-in-out-back`;
  const inputs = `leading-[39px] w-full p-[10px] bg-light dark:bg-dark text-dark dark:text-light rounded-[7px] border border-black/50 dark:border-white/50 text-[32px] tracking-tight transition-color duration-1000 ease-in-out-back`;
  const selects = `absolute top-0 right-0 cursor-pointer text-dark dark:text-light transition-all duration-1000 ease-in-out-back`;
  const menu = `absolute w-full border-t-0 border bg-light dark:bg-dark z-10 shadow-md rounded-b`;
  return (
    <form className="grid-cols-2 grid gap-12">
      <div className="flex flex-col gap-4">
        <h2 className={headings}>Course title</h2>
        <input
          name="title"
          value={data.title}
          onChange={handleChange}
          type="text"
          placeholder="Ex: Learn the basics of ..."
          className={inputs}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className={headings}>Course subtitle</h2>
        <input
          name="subtitle"
          value={data.subtitle}
          onChange={handleChange}
          type="text"
          placeholder="Ex: improve your skills..."
          className={inputs}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className={headings}>Select course Level</h2>
        <div className="relative">
          <select
            id="level"
            value={data.level}
            onChange={handleChange}
            name="level"
            className={`${inputs} appearance-none w-full h-[60px] text-dark dark:text-light bg-light dark:bg-dark rounded-[6px] border border-dark/50 dark:border-light/50 transition-all duration-1000 ease-in-out-back tracking-tight leading-l p-[10px]`}
          >
            <option value="">-- Select Level --</option>
            {list.levels.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>

          <DownSquareFill
            className="absolute top-0 right-0 pointer-events-none"
            size={60}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className={headings}>Select course type</h2>
        <div className="relative">
          <select
            id="level"
            value={data.type}
            onChange={handleChange}
            name="type"
            className={`${inputs} appearance-none w-full h-[60px] text-dark dark:text-light bg-light dark:bg-dark rounded-[6px] border border-dark/50 dark:border-light/50 transition-all duration-1000 ease-in-out-back tracking-tight leading-l p-[10px]`}
          >
            <option value="">-- Select Type --</option>
            {list.types.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>

          <DownSquareFill
            className="absolute top-0 right-0 pointer-events-none"
            size={60}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>Course description</h2>
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Insert your course description here"
          cols="30"
          rows="5"
          className={inputs}
        />
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>What’s taught in your course?</h2>
        <input
          type="text"
          placeholder="Ex: how to style a website using ..."
          className={inputs}
        />
        <button className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2">
          <Add />
          <span>insert one more item</span>
        </button>
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>
          What are the prerequisites for your course?
        </h2>
        <input
          type="text"
          placeholder="Ex: familiarity with HTML, CSS, and JavaScript"
          className={inputs}
        />
        <button className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2">
          <Add />
          <span>insert one more item</span>
        </button>
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>
          Who is the intended audience for this course?
        </h2>
        <input
          type="text"
          placeholder="Ex: frontend developers who love to extend their skill set"
          className={inputs}
        />
        <button className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2">
          <Add />
          <span>insert one more item</span>
        </button>
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>
          Who is the intended audience for this course?
        </h2>
        <div className="flex gap-8">
          <div className="w-[600px] aspect-video flex justify-center items-center overflow-hidden">
            <img
              className="object-contain"
              src={
                typeof image == "string" ? image : URL.createObjectURL(image)
              }
              alt="course thumbnail"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="text-[32px]">
              <h3 className="mb-4 font-medium text-accent/80 leading-[38.73px]">
                Video Thumbnail Size
              </h3>
              <p className="leading-[39px]">
                The thumbnail for your uploaded video should ideally be 600
                pixels wide by 338 pixels tall, which corresponds to an aspect
                ratio of 16:9
              </p>
            </div>
            <button
              type="button"
              onClick={() => photo.current.click()}
              className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
            >
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
                ref={photo}
              />
              Upload course thumbnail
              <Upload />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>Would you like to publish your course ?</h2>
        <div className="flex gap-4">
          <button>Activate the course</button>
          <button className="border border-accent p-[10px]  dark:bg-light rounded-[5px] font-semibold text-primary">
            Inactivate the course
          </button>
        </div>
      </div>
      <div className="flex flex-row-reverse col-span-2">
        <button className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">
          Sava
        </button>
      </div>
    </form>
  );
};

export default Info;
