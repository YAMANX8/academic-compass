import { useMemo, useEffect, useReducer, useCallback } from "react";
import { SettingsContext } from "./settings-context";
import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { useSubmitSettings } from "../../apis/instructor";
import { toast } from "react-toastify";
import moment from "moment";

// ----------------------------------------------------------------------
const Types = {
  INITIAL: "INITIAL",
  UPDATE_FIELD: "UPDATE_FIELD",
  UPLOAD_IMAGE: "UPLOAD_IMAGE",
  REMOVE_IMAGE: "REMOVE_IMAGE",
};

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  education: "",
  birth_date: "",
  country: "",
  city: "",
  currentPassword: "",
  newPassword: "",
  verifyNewPassword: "",
  image: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case Types.INITIAL: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case Types.UPDATE_FIELD: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case Types.UPLOAD_IMAGE: {
      return {
        ...state,
        [action.payload.name]: action.payload.files[0],
      };
    }
    case Types.REMOVE_IMAGE: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
};

// ----------------------------------------------------------------------
export function SettingsProvider({ children }) {
  const { user } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const submitSettings = useSubmitSettings();

  const initialization = useCallback(() => {
    try {
      const userData = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        education: user.education || "",
        birth_date: user.birth_date || "",
        country: user.country || "",
        city: user.city || "",
        image: user.picture || "",
      };
      dispatch({
        type: Types.INITIAL,
        payload: userData,
      });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {},
      });
    }
  }, [user]);
  useEffect(() => {
    initialization();
  }, [initialization]);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    type == "file"
      ? dispatch({
          type: Types.UPLOAD_IMAGE,
          payload: { name, files },
        })
      : type == "date"
        ? dispatch({
            type: Types.UPDATE_FIELD,
            payload: { name, value: moment(value).format("YYYY-MM-DD") },
          })
        : dispatch({
            type: Types.UPDATE_FIELD,
            payload: { name, value },
          });
    console.log([name], value, type);
  };

  const handleRemove = () => {
    dispatch({
      type: Types.REMOVE_IMAGE,
      payload: { name: "image", value: "" },
    });
  };
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await submitSettings(state);
        console.log("Settings updated successfully:", response);
        toast.success("Settings updated successfully!");
      } catch (error) {
        console.error("Error updating settings:", error.response.data.message);
        toast.error(error.response.data.message);
      }
    },
    [state, submitSettings],
  );

  // ____________________________________________________________
  const memoizedValue = useMemo(
    () => ({
      ...state,
      handleChange,
      handleSubmit,
      handleRemove,
    }),
    [state, handleChange, handleSubmit],
  );
  console.log(user);
  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
