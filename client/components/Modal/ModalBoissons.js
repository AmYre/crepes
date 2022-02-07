import { useGlobalContext } from '../../context/Context';
import Image from 'next/image';
import { useState } from 'react';
import { useMenuList } from '../../hooks/queries/useMenuList';

const ModalBoissons = ({
	product_name,
	price,
	category_name,
	url,
	width,
	height,
	i,
}) => {
	const [modal, setModal] = useState(false);
	const [inputQuantity, setInputQuantity] = useState(1);
	// const [specialInstruction, setSpecialInstruction] = useState('');

	const { data } = useMenuList();

	const {
		productsList,
		setProductsList,
		randomNumber,
		supplementName,
		setSupplementName,
		supplementPrice,
		setSupplementPrice,
	} = useGlobalContext();

	const totalSupplement = supplementPrice.reduce((a, b) => a + b, 0);

	const myLoader = ({ src, width, quality }) => {
		return `http://localhost:1337${src}?w=${width}&q=${quality || 75}`;
	};

	return (
		<div className="flex items-center border-t-2 z-50 hover:bg-gray-100">
			<div
				className={`${
					modal
						? 'flex items-center justify-center z-10 bg-white bg-opacity-70 h-screen w-full fixed bottom-0 left-0'
						: 'hidden '
				}`}
			>
				<div className="bg-white py-0 rounded w-full sm:w-2/3 md:w-1/2">
					<div className="w-full h-screen py-10 px-3 bg-gray-100 relative">
						<Image
							loader={myLoader}
							src={url}
							layout="intrinsic"
							width={400}
							height={400}
							alt={product_name}
							className="object-contain"
						/>
						<p className="text-xl font-bold mt-5">{product_name}</p>
						{/* <input
							className="h-10 w-full p-1 mt-2 mb-5 shadow border rounded form-input ring-blue-600 outline-none focus:ring-2"
							type="number"
							onChange={(e) => setInputQuantity(e.target.value)}
							defaultValue="1"
							min="1"
						/> */}

						<div className="absolute bottom-0 left-0 w-full">
							<button
								className="w-full text-bold bg-blue-600 text-white text-xl px-3 py-5"
								onClick={() => {
									setProductsList([
										...productsList,
										{
											product_name: product_name,
											category_name: category_name,
											price: price,
											quantity: Number(inputQuantity),
											supplement_name: supplementName,
											supplement_price: supplementPrice,
											// special_instruction:
											// 	specialInstruction,
										},
									]);

									setModal(!modal);
									setSupplementName([]);
									setSupplementPrice([]);
									totalSupplement = 0;
								}}
							>
								Ajouter aux panier
							</button>
						</div>
						<div className="flex justify-between">
							<button
								className="text-bold"
								onClick={() => setModal(!modal)}
							>
								Fermé
							</button>
							<p className="text-xl font-bold">
								{inputQuantity * price} €{' '}
							</p>
						</div>
					</div>
				</div>
			</div>
			<Image
				loader={myLoader}
				src={url}
				width={100}
				height={100}
				alt={product_name}
				className="object-contain"
			/>

			<div className="flex justify-between w-full p-2">
				<p className="text-lg font-bold">{product_name}</p>
				<div className="flex space-x-2">
					<p className="text-lg font-bold">{price} € </p>
				</div>
			</div>
			<button
				onClick={() => setModal(!modal)}
				className="w-6 cursor-pointer"
			>
				Choisir
			</button>
		</div>
	);
};

export default ModalBoissons;
