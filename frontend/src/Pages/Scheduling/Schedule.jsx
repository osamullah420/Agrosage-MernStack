import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const Schedule = () => {
  const [scheduledTime, setScheduledTime] = useState(new Date());
  const [targetUserId, setTargetUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const getusers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/users/getallusers"
        );
        const users = res.data.users;
        const oppositeRole =
          auth.user.userRole === "Company" ? "Retailer" : "Company";
        const filteredUsers = users.filter(
          (user) => user.userRole === oppositeRole
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.log(error);
        toast.error("Error while fetching users", {
          position: "bottom-right",
        });
      }
    };

    if (auth.user) {
      getusers();
    }
  }, [auth.user]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/schedule/createschedule",
        {
          targetUserId,
          scheduledTime,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          position: "bottom-right",
        });
      } else {
        toast.error(res.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Schedule your <span className="text-green">Calls</span>
      </h2>
      {/**form */}

      <form onSubmit={HandleSubmit}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text font-bold">Select User</span>
          </label>
          <select
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full my-6 ">
          <label className="label">
            <span className="label-text font-bold">Select Date & time</span>
          </label>
          <DatePicker
            className="bordered-solid"
            selected={scheduledTime}
            onChange={(date) => setScheduledTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15} // Interval of time selection
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa" // Adjust date format to include time
            minDate={new Date()}
          />
        </div>

        <button type="submit" className="btn bg-green text-white my-4 px-6">
          Schedule Call
        </button>
      </form>
    </div>
  );
};

export default Schedule;
