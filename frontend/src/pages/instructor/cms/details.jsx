import { useState, useRef, useEffect } from "react";
import {
  BsCaretDownSquareFill as DownSquareFill,
  BsPlus as Add,
  BsCloudUpload as Upload,
} from "react-icons/bs";
import { MdOutlineSave } from "react-icons/md";
import {
  useGetDetails1,
  useGetDetails2,
  useGetDetails3,
} from "../../../apis/cms";
import { BiEdit as Edit } from "react-icons/bi";
import { useAuthContext } from "src/auth/hooks";
import axios from "src/apis/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Button } from "../../../components";
const Details = () => {
  const getDetails1 = useGetDetails1();
  const getDetails2 = useGetDetails2();
  const getDetails3 = useGetDetails3();

  const { user } = useAuthContext();
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

  //for ordering
  const [learnCount, setLearnCount] = useState(0);
  const [whoCount, setWhoCount] = useState(0);
  const [preCount, setPreCount] = useState(0);

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
  const handleAddClick = (setArray, order, type, setOrder) => {
    setArray((prevData) => [
      ...prevData,
      { item_body: "", item_order: order, list_type: type },
    ]);
    setOrder(order);
  };

  // handling editing lists
  const [whoForStatus, setWhoForStatus] = useState([]);
  const [whatLearnStatus, setWhatLearnStatus] = useState([]);
  const [preStatus, setPreStatus] = useState([]);

  const [updateWhoFor, setUpdateWhoFor] = useState([]); // array state
  const [updateWhatLearn, setUpdateWhatLearn] = useState([]); // array state
  const [updatePrerequisites, setUpdatePrerequisites] = useState([]); // array state

  const handleEditClick = (
    index,
    oldValue,
    setArray,
    status,
    setStatus,
    type,
  ) => {
    const updatedIsEdited = [...status];
    updatedIsEdited[index] = !updatedIsEdited[index];
    setStatus(updatedIsEdited);
    setArray((prevData) => [
      ...prevData,
      {
        id: index,
        item_body: oldValue,
        newitem_body: oldValue,
        list_type: type,
      },
    ]);
  };
  const handleEditChange = (setArray, index, newValue) => {
    setArray((prevArray) => {
      return prevArray.map((item) => {
        if (item.id === index) {
          return { ...item, newitem_body: newValue };
        } else {
          return item;
        }
      });
    });
  };
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
      const res = await getDetails1();
      setList(res.data);
      const res2 = await getDetails2(id);
      const level = await res.data.levels.find(
        (i) => i.title == res2.data.level,
      );
      const type = await res.data.types.find((i) => i.title == res2.data.type);
      const data = await res2.data;
      const sortedWhatLearn = [...data.whatLearn].sort(
        (a, b) => a.item_order - b.item_order,
      );
      const sortedWhoFor = [...data.whoFor].sort(
        (a, b) => a.item_order - b.item_order,
      );
      const sortedPre = [...data.prerequisites].sort(
        (a, b) => a.item_order - b.item_order,
      );

      setData(() => ({
        ...data,
        whatLearn: sortedWhatLearn,
        whoFor: sortedWhoFor,
        prerequisites: sortedPre,
        title: data?.title ? data.title : "",
        subtitle: data?.subtitle ? data.subtitle : "",
        description: data?.description ? data.description : "",
        thumbnail: data?.thumbnail ? data.thumbnail : "",
        isActive: data.isActive != "true" ? false : true,
        level: level.id,
        type: type.id,
      }));
      setImage(
        data?.thumbnail ? `http://localhost:5000/image/${data.thumbnail}` : "",
      );
      setPreStatus(new Array(data.prerequisites.length).fill(false));
      setWhoForStatus(new Array(data.whoFor.length).fill(false));
      setWhatLearnStatus(new Array(data.whatLearn.length).fill(false));
      setLearnCount(await res2.data.whatLearn.length);
      setWhoCount(await res2.data.whoFor.length);
      setPreCount(await res2.data.prerequisites.length);
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
    // formdata.forEach((value, key) => console.log(`${key}: ${value}`));
    try {
      const res = await getDetails3(id, formdata);
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
    <>
      <Helmet>
        <title>Editing: Course details</title>
      </Helmet>
      <form className="grid grid-cols-2 gap-12" onSubmit={handleSubmit}>
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
              className={`${inputs} h-[60px] w-full appearance-none rounded-[6px] border border-dark/50 bg-light p-[10px] leading-l tracking-tight text-dark transition-all duration-1000 ease-in-out-back dark:border-light/50 dark:bg-dark dark:text-light`}
            >
              <option value="">-- Select Level --</option>
              {list.levels.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>

            <DownSquareFill
              className="pointer-events-none absolute right-0 top-0"
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
              className={`${inputs} h-[60px] w-full appearance-none rounded-[6px] border border-dark/50 bg-light p-[10px] leading-l tracking-tight text-dark transition-all duration-1000 ease-in-out-back dark:border-light/50 dark:bg-dark dark:text-light`}
            >
              <option value="">-- Select Type --</option>
              {list.types.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>

            <DownSquareFill
              className="pointer-events-none absolute right-0 top-0"
              size={60}
            />
          </div>
        </div>

        {/* course description input */}
        <div className="col-span-2 flex flex-col gap-4">
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
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className={headings}>What’s taught in your course?</h2>
          {data.whatLearn.map((item, index) => (
            <div className="group relative" key={index}>
              <input
                type="text"
                value={
                  whatLearnStatus.length > 0 && whatLearnStatus[index]
                    ? updateWhatLearn.find((i) => i.id == index).newitem_body
                    : item.item_body
                }
                placeholder="Ex: how to style a website using ..."
                className={`${inputs} ${
                  whatLearnStatus.length > 0 &&
                  whatLearnStatus[index] &&
                  `!bg-primary/40 dark:bg-primary/40`
                }`}
                onChange={(e) =>
                  handleEditChange(setUpdateWhatLearn, index, e.target.value)
                }
                disabled={
                  whatLearnStatus.length > 0 && whatLearnStatus[index]
                    ? false
                    : true
                }
              />
              <button
                type="button"
                onClick={(e) =>
                  handleEditClick(
                    index,
                    item.item_body,
                    setUpdateWhatLearn,
                    whatLearnStatus,
                    setWhatLearnStatus,
                    1,
                  )
                }
                className="absolute right-[10px] top-[50%] hidden -translate-y-1/2 group-hover:block"
              >
                {whatLearnStatus.length > 0 && whatLearnStatus[index] ? null : (
                  <Edit size={50} />
                )}
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
          <Button
            type="button"
            variant="outlined"
            size="lg"
            onClick={() =>
              handleAddClick(setWhatLearn, learnCount + 1, 1, setLearnCount)
            }
            className="self-start"
          >
            <Add size={24} />
            <span>Insert New Item</span>
          </Button>
        </div>

        {/* prerequisites list */}
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className={headings}>
            What are the prerequisites for your course?
          </h2>
          {data.prerequisites.map((item, index) => (
            <div className="group relative" key={index}>
              <input
                type="text"
                value={
                  preStatus.length > 0 && preStatus[index]
                    ? updatePrerequisites.find((i) => i.id == index)
                        .newitem_body
                    : item.item_body
                }
                placeholder="Ex: how to style a website using ..."
                className={`${inputs} ${
                  preStatus.length > 0 &&
                  preStatus[index] &&
                  `!bg-primary/40 dark:bg-primary/40`
                }`}
                onChange={(e) =>
                  handleEditChange(
                    setUpdatePrerequisites,
                    index,
                    e.target.value,
                  )
                }
                disabled={
                  preStatus.length > 0 && preStatus[index] ? false : true
                }
              />
              <button
                type="button"
                onClick={(e) =>
                  handleEditClick(
                    index,
                    item.item_body,
                    setUpdatePrerequisites,
                    preStatus,
                    setPreStatus,
                    3,
                  )
                }
                className="absolute right-[10px] top-[50%] hidden -translate-y-1/2 group-hover:block"
              >
                {preStatus.length > 0 && preStatus[index] ? null : (
                  <Edit size={50} />
                )}
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
          <Button
            type="button"
            variant="outlined"
            size="lg"
            onClick={() =>
              handleAddClick(setPrerequisites, preCount + 1, 3, setPreCount)
            }
            className="self-start"
          >
            <Add size={24} />
            <span>Insert New Item</span>
          </Button>
        </div>

        {/* who for list */}
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className={headings}>
            Who is the intended audience for this course?
          </h2>
          {data.whoFor.map((item, index) => (
            <div className="group relative" key={index}>
              <input
                type="text"
                value={
                  whoForStatus.length > 0 && whoForStatus[index]
                    ? updateWhoFor.find((i) => i.id == index).newitem_body
                    : item.item_body
                }
                placeholder="Ex: how to style a website using ..."
                className={`${inputs} ${
                  whoForStatus.length > 0 &&
                  whoForStatus[index] &&
                  `!bg-primary/40 dark:bg-primary/40`
                }`}
                onChange={(e) =>
                  handleEditChange(setUpdateWhoFor, index, e.target.value)
                }
                disabled={
                  whoForStatus.length > 0 && whoForStatus[index] ? false : true
                }
              />
              <button
                type="button"
                onClick={(e) =>
                  handleEditClick(
                    index,
                    item.item_body,
                    setUpdateWhoFor,
                    whoForStatus,
                    setWhoForStatus,
                    2,
                  )
                }
                className="absolute right-[10px] top-[50%] hidden -translate-y-1/2 group-hover:block"
              >
                {whoForStatus.length > 0 && whoForStatus[index] ? null : (
                  <Edit size={50} />
                )}
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
          <Button
            type="button"
            variant="outlined"
            size="lg"
            onClick={() =>
              handleAddClick(setWhoFor, whoCount + 1, 2, setWhoCount)
            }
            className="flex items-center gap-2 self-start rounded-[5px] border border-primary bg-light p-[10px] text-primary"
          >
            <Add size={24} />
            <span>Insert New Item</span>
          </Button>
        </div>

        {/* course thumbnail input */}
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className={headings}>Course thumbnail</h2>
          <div className="flex gap-8">
            <div className="flex aspect-video w-[600px] items-center justify-center overflow-hidden">
              <img
                className="object-contain"
                src={
                  typeof image == "string" ? image : URL.createObjectURL(image)
                }
                alt="course thumbnail"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="text-[32px]">
                <h3 className="mb-4 font-medium leading-[38.73px] text-accent/80">
                  Video Thumbnail Size
                </h3>
                <p className="leading-[39px]">
                  The thumbnail for your uploaded video should ideally be 600
                  pixels wide by 338 pixels tall, which corresponds to an aspect
                  ratio of 16:9
                </p>
              </div>
              <Button type="button" onClick={() => photo.current.click()}>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                  ref={photo}
                />
                Upload course thumbnail
                <Upload />
              </Button>
            </div>
          </div>
        </div>

        {/* course activation toggle */}
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className={headings}>Would you like to publish your course ?</h2>
          <button
            type="button"
            className={`relative h-[56px] w-[106px] rounded-full ${
              data.isActive ? `bg-primary` : `bg-gray-400`
            } transition-all duration-500`}
            onClick={() =>
              setData((prev) => ({ ...prev, isActive: !prev.isActive }))
            }
          >
            <div
              className={`absolute left-[3px] top-[3px] aspect-square w-[50px] rounded-full bg-light ${
                data.isActive && `left-[calc(100%-53px)]`
              } transition-all duration-500`}
            />
          </button>
        </div>

        <div className="col-span-2 flex flex-row-reverse">
          <Button size="lg">
            <MdOutlineSave size={24} />
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Details;
