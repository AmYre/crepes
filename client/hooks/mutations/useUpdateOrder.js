import { gql } from '@apollo/client';

export const UPDATE_ORDER = gql`
	mutation updateCommande(
		$id: ID!
		$total: Float
		$order_id: Int
		$confirm_order: Boolean
		$is_prepared: Boolean
		$products: [ComponentProductDetailProductsInput]
	) {
		updateCommande(
			id: $id
			data: {
				total: $total
				order_id: $order_id
				confirm_order: $confirm_order
				is_prepared: $is_prepared
				products: $products
			}
		) {
			data {
				attributes {
					confirm_order
					is_prepared
					products {
						product_name
						price
					}
				}
			}
		}
	}
`;
