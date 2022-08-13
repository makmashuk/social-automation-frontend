import styles from '../styles/Setting.module.scss'
import Paperbase from '../components/Paperbase'
import ChannelCard from '../components/Setting/ChannelCard'
import Box from '@mui/material/Box';
export default function Setting() {
    return (
        <Box
            sx={{
                display: 'grid',
                width:'50%',
                margin:'auto',
                alignContent:'center',
                height:'100%',
                columnGap: 2,
                rowGap: 2,
                gridTemplateColumns: 'repeat(3, 1fr)',
            }}
        >
            <ChannelCard/>
          
            {/* <ChannelCard/> */}
        </Box>
    )
}

Setting.getLayout = function getLayout(page) {
    return (
        <Paperbase>{page}</Paperbase>
    )
}