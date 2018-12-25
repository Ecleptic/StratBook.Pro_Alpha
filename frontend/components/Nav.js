import Link from 'next/link'
import NavStyles from './styles/NavStyles'
// import CreateUser from './CreateUser'

const Nav = () => (
    <NavStyles>
        <Link href="/Overwatch">
            <a>Overwatch</a>
        </Link>
        {/* <CreateUser /> */}
    </NavStyles>
)

export default Nav
