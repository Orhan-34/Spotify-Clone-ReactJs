import React from "react";
import Navbar from "./Navbar";
import { albumsData, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";

const DisplayHome = () => {
	return (
		<>
			<Navbar />
			<div className="my-5 ">
				<h2 className="font-bold text-2xl my-5">Featured Charts</h2>
				<div className="flex overflow-auto">
					{albumsData.map((album, index) => (
						<AlbumItem
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							image={album.image}
							name={album.name}
							desc={album.desc}
							id={album.id}
						/>
					))}
				</div>
			</div>
      <div className="my-5 ">
				<h2 className="font-bold text-2xl my-5">Today's biggest hits</h2>
				<div className="flex overflow-auto">
					{songsData.map((song, index) => (
						<SongItem
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							image={song.image}
							name={song.name}
							desc={song.desc}
							id={song.id}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default DisplayHome;
