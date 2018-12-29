import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from '../components/Signout'
import Signin from './Signin'
const Nav = () => (
    <NavStyles>
        <Link href="/Overwatch">
            <a>Overwatch</a>
        </Link>
        {/* <CreateUser /> */}
        <User>
            {({ data: { me } }) => {
                if (me) {
                    return <Signout />
                } else {
                    return (
                        // TODO: make this a button that shows the sign-in portal/modal
                        <Link href="/">
                            <a>Sign In</a>
                        </Link>
                    )
                }
            }}
        </User>
    </NavStyles>
)

export default Nav
