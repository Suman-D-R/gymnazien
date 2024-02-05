import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreateEventProps {}

interface PlayerData {
  firstName: string;
  lastName: string;
  club: string;
  phoneNumber: string;
}

const CreateEvent: React.FC<CreateEventProps> = () => {
  const [playerList, setPlayerList] = useState<PlayerData>({
    firstName: "",
    lastName: "",
    club: "",
    phoneNumber: "",
  });
  const [totalPlayers, setTotalPlayers] = useState<PlayerData[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PlayerData
  ) => {
    setPlayerList((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleInputPhoneNumber = (value: string) => {
    setPlayerList({ ...playerList, phoneNumber: value });
  };

  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const validatePlayerData = (): boolean => {
    if (playerList.firstName.length < 3) {
      notifyError("First name should be a minimum of 3 characters");
      return false;
    }
    if (playerList.lastName.length < 1) {
      notifyError("Last name should be a minimum of 1 character");
      return false;
    }
    return true; 
  };

  const handleAddPlayer = () => {
    if (!validatePlayerData()) {
      return; 
    }
    setTotalPlayers((prevPlayers) => [...prevPlayers, playerList]);
    setPlayerList({
      firstName: "",
      lastName: "",
      club: "",
      phoneNumber: "",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-full flex flex-col items-center my-10 font-sans">
        <div className="w-[90%] flex flex-col gap-3">
          <div className="flex flex-col gap-3 p-2 rounded-md w-full">
            <p className="text-3xl font-sans  font-semibold">Add Players</p>
            <div className="flex p-2 rounded-md gap-3 justify-between border-2 shadow-2xl">
              <p className="w-[5%] p-2 ">{totalPlayers.length + 1}.</p>
              <input
                onChange={(e) => handleInputChange(e, "firstName")}
                value={playerList.firstName}
                type="text"
                className="w-[20%] outline-none p-2 border-2"
                placeholder="First name"
              />
              <input
                onChange={(e) => handleInputChange(e, "lastName")}
                value={playerList.lastName}
                type="text"
                className="w-[20%] outline-none p-2 border-2"
                placeholder="Last Name"
              />
              <input
                onChange={(e) => handleInputChange(e, "club")}
                value={playerList.club}
                type="text"
                className="w-[20%] outline-none p-2 border-2"
                placeholder="Club"
              />
              <PhoneInput
                className="w-[20%] outline-none p-2 border-2 "
                placeholder="Enter phone number"
                value={playerList.phoneNumber}
                onChange={handleInputPhoneNumber}
              />
              <button
                className="bg-black text-white rounded-md px-8"
                onClick={handleAddPlayer}
              >
                Add
              </button>
            </div>
            <p className="text-2xl font-semibold">Players</p>
            <div className="shadow-xl rounded-md w-full min-h-[200px]">
              <div className="flex justify-between w-full p-2 bg-gray-800 rounded-t-[5px] text-white font-semibold">
                <p className="w-[5%] ">No.</p>
                <p className="w-[20%] ">First Name</p>
                <p className="w-[20%] ">Last Name</p>
                <p className="w-[20%] ">Club</p>
                <p className="w-[20%] ">Phone Number</p>
              </div>
              {totalPlayers.length ? (
                totalPlayers?.map((data, index) => (
                  <div
                    key={index}
                    className="flex justify-between w-full p-2 border-b-2"
                  >
                    <p className="w-[5%] ">{index + 1}.</p>
                    <p className="w-[20%] ">{data.firstName}</p>
                    <p className="w-[20%] ">{data.lastName}</p>
                    <p className="w-[20%] ">{data.club}</p>
                    <p className="w-[20%] ">{data.phoneNumber}</p>
                  </div>
                ))
              ) : (
                <div className="flex justify-between w-full p-2 border-b-2">
                  <p className="w-[5%] ">1.</p>
                  <p className="w-[20%] ">Player Name</p>
                  <p className="w-[20%] ">Last Name</p>
                  <p className="w-[20%] ">Club name</p>
                  <p className="w-[20%] ">96446XXX</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
