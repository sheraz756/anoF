import React, { useState, useEffect } from 'react';
import UserAddRoomModal from '../../components/UserAddRoomModal/UserAddRoomModal';
import UserRoomCard from '../../components/UserRoomCard/UserRoomCard';
import styles from './Rooms.module.css';
import { getAllRooms } from '../../http';



const Rooms = () => {
    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllRooms();
            setRooms(data);
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
                            <img src="/images/search-icon.png" alt="search" />
                            <input type="text" className={styles.searchInput} />
                        </div>
                    </div>
                    <div className={styles.right}>
                     
                            {/* <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            /> */}
                            <span>Your Rooms</span>
                        
                    </div>
                </div>

                <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <UserRoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            {showModal && <UserAddRoomModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Rooms;