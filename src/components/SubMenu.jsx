// Filename - components/SubMenu.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
	display: flex;
	color: #D5B690;
	justify-content: space-between; 
	align-items: center;
	padding: 0px;
	height: 50px;
	color: black;
	font-size: 18px;

	&:hover {
		background: white;
		cursor: pointer;
	}
`;

const SidebarLabel = styled.span`
	margin-left: 10px;
	color: black;
	font-size: 15px;
	font-family:'Montserrat', sans-serif;
`;

const DropdownLink = styled(Link)`
	background: #D5B690;
	height: 30px;
	padding-left: 3rem;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #f5f5f5;
	font-size: 15px;

	&:hover {
		background: #65647C;
		cursor: pointer;
	}
`;

const SubMenu = ({ item }) => {
	const [subnav, setSubnav] = useState(false);

	const showSubnav = () => setSubnav(!subnav);

	return (
		<>
			<SidebarLink
				to={item.path}
				onClick={item.subNav && showSubnav}
			>
				<div>
					{item.icon}
					<SidebarLabel>
						Reports
					</SidebarLabel>
				</div>
				<div>
					{item.subNav && subnav
						? item.iconOpened
						: item.subNav
						? item.iconClosed
						: null}
				</div>
			</SidebarLink>
			{subnav &&
				item.subNav.map((item, index) => {
					return (
						<DropdownLink
							to={item.path}
							key={index}
						>
							{item.icon}
							<SidebarLabel>
								{item.title}
							</SidebarLabel>
						</DropdownLink>
					);
				})}
		</>
	);
};

export default SubMenu;
