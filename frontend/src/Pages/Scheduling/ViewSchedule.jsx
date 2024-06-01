import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { MdAddIcCall } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Component/Spinner";

const ViewSchedule = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  const getSchedules = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/schedule/getschedulesbyid",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setSchedule(data.schedule);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ", {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      getSchedules();
    }
  }, [auth.token]);

  const handleCall = (scheduleId) => {
    navigate(`/admindashboard/call/${scheduleId}`); // Navigate to the Call component with the scheduleId
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="flex items-center justify-between m-4 gap-[40rem]">
            <h5 className="text-2xl font-semibold my-4">
              Your<span className="text-green"> Schedules</span>
            </h5>
            <h5 className="text-2xl font-semibold my-4">
              Total Schedules: {schedule.length}
            </h5>
          </div>
          {/**table */}
          <div>
            <div className="overflow-x-auto">
              {schedule.length === 0 ? (
                <h2 className="text-center text-2xl font-semibold my-4">
                  No Schedules available
                </h2>
              ) : (
                <table className="table table-zebra md:w-[870px]">
                  {/* head */}
                  <thead className="bg-green text-white rounded-lg">
                    <tr>
                      <th>#</th>
                      <th>Scheduler</th>
                      <th>Target User</th>
                      <th>Date</th>
                      <th>time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row  */}
                    {schedule.map((s, index) => {
                      // Parse the scheduledTime into a Date object
                      const scheduledDate = new Date(s.scheduledTime);
                      const displayDate = scheduledDate.toLocaleDateString();
                      const displayTime = scheduledDate.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true, // This ensures you get the AM/PM part
                        }
                      );

                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{s.schedulername}</td>
                          <td>{s.targetUsername}</td>
                          <td>{displayDate}</td>
                          <td>{displayTime}</td>
                          <td>
                            <button
                              className="btn bg-success rounded-full text-white"
                              onClick={() => handleCall(s._id)} // Pass scheduleId to handleCall function
                            >
                              <MdAddIcCall />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewSchedule;
