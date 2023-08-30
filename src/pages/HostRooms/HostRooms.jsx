import React, { useState, useEffect } from 'react';
import HostAddRoomModal from '../../components/HostAddRoomModal/HostAddRoomModal';
import HostRoomCard from '../../components/HostRoomCard/HostRoomCard';
import styles from './HostRooms.module.css';
import { getAllRooms } from '../../http';



const HostRooms = () => {
    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllRooms();
            setRooms(data);
            console.log(data)
        };
        fetchRooms();
    }, []);
    function openModal() {
        setShowModal(true);
    }
    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>
                        <div className={styles.searchBox}>
                            <img src="/images/search-icon.png" alt="search" className={styles.img} />
                            <input type="text" className={styles.searchInput} />
                        </div>
                    </div>
                    <div className={styles.right}>
                     
                    <button
                            onClick={openModal}
                            className={styles.startRoomButton}
                        >
                            <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            />
                            <span>Start a room</span>
                        </button>
                    </div>
                </div>

                <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <HostRoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            {showModal && <HostAddRoomModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default HostRooms;