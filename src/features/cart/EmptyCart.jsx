import ButtonLink from '../../ui/ButtonLink';

function EmptyCart() {
  return (
    <div className='p-5'>
      <ButtonLink to="/menu">&larr; Back to menu</ButtonLink>

      <p className='font-semibold mt-8'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
