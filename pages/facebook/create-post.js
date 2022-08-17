
import Paperbase from '../../components/Paperbase';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { createFacebookPost, getAllFacebookPages } from '../../services/settingApi';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import parse from 'html-react-parser';


const DynamicEditor = dynamic(() => import('../../components/Common/Editor'), {
  ssr: false,
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};


function createPost() {

  const [allPages, setAllPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [editorText, setEditorText] = useState("Some default content");

  useEffect(() => {

    async function fetchData() {
      const response = await getAllFacebookPages();
      const settingData = response.data?.data;

      setAllPages(settingData);

    }
    fetchData();

  }, [])
  const handleEditorChange = (text) => {
    setEditorText(text);
  }
  const handlePageChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPages(
      typeof value === 'number' ? value.split(',') : value,
    );
  };
  const getTextFromId = (selectedIds) => {
    return selectedIds.map(i => {
      return allPages.find(item => item.id === i)?.name + ', ';
    })
  }

  const formik = useFormik({
    initialValues: {
      campaignName:'',
      url:''
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(selectedPages);
      console.log(editorText);
      console.log(values);
      const payload = {
        "campaign_name": values.campaignName,
        "body": editorText,
        "url": values.url,
        "facebook_pages": selectedPages
      };
      console.log(payload);
      const data = await createFacebookPost(payload);
      console.log(data);
     
    },
  });


  return (
    <>
      <Grid container spacing={2} padding={2}>

        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom component="div">
            Create a Facebook Campaign
          </Typography>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>

            <FormControl sx={{ m: 1, width: '100%' }}>
              <InputLabel id="page-group-select">Pages/Groups</InputLabel>
              <Select
                labelId="page-group-select"
                id="page"
                multiple
                value={selectedPages}
                onChange={handlePageChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(e) => getTextFromId(e)}
                MenuProps={MenuProps}
              >
                {allPages.map((page) => (
                  <MenuItem key={page.id} value={page.id}>
                    <Checkbox checked={selectedPages.indexOf(page.id) > -1} />
                    <ListItemText primary={page.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: '100%' }}>
              <TextField
                size="small"
                id="campaignName"
                name="campaignName"
                label="Campaign Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.campaignName}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '100%' }}>
              <Typography variant="subtitle1" className='mx-2' gutterBottom component="div">
                Write your post
              </Typography>
              <DynamicEditor editorText={editorText} handleChange={handleEditorChange} />
            </FormControl>
            <FormControl sx={{ m: 1, width: '100%' }}>
              <TextField
                size="small"
                id="url"
                name="url"
                label="External Link"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.url}
              />
            </FormControl>
            <hr />
            <Button type="submit" color="primary" fullWidth variant="contained" >
              Create Post
            </Button>

          </form>
        </Grid>
        <Grid>
          {selectedPages}
          {parse(editorText)}
        </Grid>
      </Grid>
    </>
  )
}

export default createPost
createPost.getLayout = function getLayout(page) {
  return (
    <Paperbase>{page}</Paperbase>
  )
}