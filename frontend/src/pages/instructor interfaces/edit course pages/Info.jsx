import { useState, useRef, useEffect } from "react";
import {
  BsCaretDownSquareFill as DownSquareFill,
  BsPlus as Add,
  BsCloudUpload as Upload,
} from "react-icons/bs";
import { AiOutlineCheck as Check, AiOutlineClose as X } from "react-icons/ai";
import { BiEdit as Edit } from "react-icons/bi";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../apis/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Info = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const photo = useRef();
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    level: "",
    type: "",
    description: "",
    whatLearn: [{ item_body: "", item_order: 1 }],
    whoFor: [{ item_body: "", item_order: 2 }],
    prerequisites: [{ item_body: "", item_order: 3 }],
    thumbnail: "",
    isActive: false,
  });
  const [image, setImage] = useState("");
  const [list, setList] = useState({
    levels: [],
    types: [],
  });
  // **********************************************************************************************************
  // handling adding lists

  const [whatLearn, setWhatLearn] = useState([]); // array state
  const [whoFor, setWhoFor] = useState([]); // array state
  const [prerequisites, setPrerequisites] = useState([]); // array state

  const handleArrayChange = (setArray, index, newValue) => {
    setArray((prevArray) => {
      return prevArray.map((item, i) => {
        if (i === index) {
          return { ...item, item_body: newValue };
        } else {
          return item;
        }
      });
    });
  };
  const handleAddClick = (setArray, order, type) => {
    setArray((prevData) => [
      ...prevData,
      { item_body: "", item_order: order, list_type: type },
    ]);
  };

  // handling editing lists
  const [updateWhoFor, setUpdateWhoFor] = useState([]); // array state
  const [updateWhatLearn, setUpdateWhatLearn] = useState([]); // array state
  const [updatePrerequisites, setUpdatePrerequisites] = useState([]); // array state

  // __________________________________________________________________________________________________________

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const getData = async () => {
    try {
      const res = await axios.get(`/instructor/createCourse`, {
        headers: {
          token: auth.accessToken,
        },
      });
      setList(res.data);
      const res2 = await axios.get(`/instructor/editeCourseInfo/${id}`, {
        headers: {
          token: auth.accessToken,
        },
      });
      const level = await res.data.levels.find(
        (i) => i.title == res2.data.level
      );
      const type = await res.data.types.find((i) => i.title == res2.data.type);
      const data = await res2.data;
      // console.log(type);
      setData(() => ({
        ...data,
        title: data?.title ? data.title : "",
        subtitle: data?.subtitle ? data.subtitle : "",
        description: data?.description ? data.description : "",
        thumbnail: data?.thumbnail ? data.thumbnail : "",
        isActive: data.isActive != "true" ? false : true,
        level: level.id,
        type: type.id,
      }));
      setImage(
        data?.thumbnail ? `http://localhost:5000/image/${data.thumbnail}` : ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("image", image);
    for (const key in data) formdata.append(key, data[key]);

    formdata.set("whatLearn", JSON.stringify(whatLearn));
    formdata.set("whoFor", JSON.stringify(whoFor));
    formdata.set("prerequisites", JSON.stringify(prerequisites));
    formdata.set("updateWhoFor", JSON.stringify(updateWhoFor));
    formdata.set("updateWhatLearn", JSON.stringify(updateWhatLearn));
    formdata.set("updatePrerequisites", JSON.stringify(updatePrerequisites));
    formdata.forEach((value, key) => console.log(`${key}: ${value}`));
    try {
      const res = await axios.put(`/instructor/editeCourseInfo/${id}`, formdata, {
        headers: {
          token: auth.accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      setWhatLearn([]);
      setWhoFor([]);
      setPrerequisites([]);
      getData();
      toast.success("Your course info is saved successfully");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // styles
  const headings = `text-[32px] font-bold tracking-tight text-dark dark:text-light transition-all duration-1000 ease-in-out-back`;
  const inputs = `leading-[39px] w-full p-[10px] bg-light dark:bg-dark text-dark dark:text-light rounded-[7px] border border-black/50 dark:border-white/50 text-[32px] tracking-tight transition-color duration-1000 ease-in-out-back`;
  return (
    <form className="grid-cols-2 grid gap-12" onSubmit={handleSubmit}>
      {/* course title input */}
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

      {/* course subtitle input */}
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

      {/* course level input */}
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

      {/* course type input */}
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

      {/* course description input */}
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>Course description</h2>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Insert your course description here"
          cols="30"
          rows="5"
          className={inputs}
        />
      </div>

      {/* what you will learn list */}
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>What’s taught in your course?</h2>
        {data.whatLearn.map((item, index) => (
          <div className="relative group" key={index}>
            <input
              type="text"
              value={item.item_body}
              placeholder="Ex: how to style a website using ..."
              className={inputs}
              disabled
            />
            <button
              type="button"
              className="absolute right-[10px] top-[50%] -translate-y-1/2 hidden group-hover:block"
            >
              <Edit size={50} />
            </button>
          </div>
          // item_body
          // list_type
          // newitem_body
        ))}
        {whatLearn.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item.item_body}
            placeholder="Ex: how to style a website using ..."
            className={`${inputs} !bg-green/40 !dark:bg-green/40`}
            onChange={(e) =>
              handleArrayChange(setWhatLearn, index, e.target.value)
            }
          />
        ))}
        {/* <input
          type="text"
          placeholder="Ex: how to style a website using ..."
          className={inputs}
        /> */}
        <button
          type="button"
          onClick={() => handleAddClick(setWhatLearn, 1, 1)}
          className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2"
        >
          <Add />
          <span>insert one more item</span>
        </button>
      </div>

      {/* prerequisites list */}
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>
          What are the prerequisites for your course?
        </h2>
        {data.prerequisites.map((item, index) => (
          <div className="relative group" key={index}>
            <input
              type="text"
              value={item.item_body}
              placeholder="Ex: how to style a website using ..."
              className={inputs}
              disabled
            />
            <button
              type="button"
              className="absolute right-[10px] top-[50%] -translate-y-1/2 hidden group-hover:block"
            >
              <Edit size={50} />
            </button>
          </div>
          // item_body
          // list_type
          // newitem_body
        ))}
        {prerequisites.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item.item_body}
            placeholder="Ex: how to style a website using ..."
            className={`${inputs} !bg-green/40 !dark:bg-green/40`}
            onChange={(e) =>
              handleArrayChange(setPrerequisites, index, e.target.value)
            }
          />
        ))}
        {/* <input
          type="text"
          placeholder="Ex: familiarity with HTML, CSS, and JavaScript"
          className={inputs}
        /> */}
        <button
          type="button"
          onClick={() => handleAddClick(setPrerequisites, 1, 3)}
          className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2"
        >
          <Add />
          <span>insert one more item</span>
        </button>
      </div>

      {/* who for list */}
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>
          Who is the intended audience for this course?
        </h2>
        {data.whoFor.map((item, index) => (
          <div className="relative group" key={index}>
            <input
              type="text"
              value={item.item_body}
              placeholder="Ex: how to style a website using ..."
              className={inputs}
              disabled
            />
            <button
              type="button"
              className="absolute right-[10px] top-[50%] -translate-y-1/2 hidden group-hover:block"
            >
              <Edit size={50} />
            </button>
          </div>
          // item_body
          // list_type
          // newitem_body
        ))}
        {whoFor.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item.item_body}
            placeholder="Ex: how to style a website using ..."
            className={`${inputs} !bg-green/40 !dark:bg-green/40`}
            onChange={(e) =>
              handleArrayChange(setWhoFor, index, e.target.value)
            }
          />
        ))}
        {/* <input
          type="text"
          placeholder="Ex: frontend developers who love to extend their skill set"
          className={inputs}
        /> */}
        <button
          type="button"
          onClick={() => handleAddClick(setWhoFor, 1, 2)}
          className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2"
        >
          <Add />
          <span>insert one more item</span>
        </button>
      </div>

      {/* course thumbnail input */}
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>Course thumbnail</h2>
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

      {/* course activation toggle */}
      <div className="flex flex-col gap-4 col-span-2">
        <h2 className={headings}>Would you like to publish your course ?</h2>
        <button
          type="button"
          className={`w-[106px] h-[56px] rounded-full relative ${
            data.isActive ? `bg-primary` : `bg-gray-400`
          } transition-all duration-500`}
          onClick={() =>
            setData((prev) => ({ ...prev, isActive: !prev.isActive }))
          }
        >
          <div
            className={`absolute top-[3px] left-[3px] w-[50px] aspect-square rounded-full bg-light ${
              data.isActive && `left-[calc(100%-53px)]`
            } transition-all duration-500`}
          />
        </button>
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
