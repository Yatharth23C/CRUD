
import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { TopicTitle, Topicdesc } = req.body;

    // Validate the input
    if (!TopicTitle || !Topicdesc) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }
    try {
      const client = await clientPromise;
      const db = client.db('Topics');
      const collection = db.collection('Topics_collection');

      const result = await collection.insertOne({ TopicTitle, Topicdesc });

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error saving topic:', error);
      console.log(req.body)
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  else if (req.method === 'GET')
 {
  
      try {
        const client = await clientPromise;
        const db = client.db('Topics');
        const collection = db.collection('Topics_collection');

        const result = await collection.find({}).toArray();

        res.status(200).json({ success: true, data: result })

      } catch (error) {
        console.error('Error retriving data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      
    }
  }
  
  else if (req.method === 'DELETE') {
    const {id} = req.body
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID is required' })

    }
    try {

      const client = await clientPromise;
      const db = client.db('Topics');
      const collection = db.collection('Topics_collection');

      const result = await collection.deleteOne({ _id: new ObjectId(id) })
      if (result.deletedCount === 1) {
        return res.status(200).json({ success: true, message: 'Topic deleted successfully ' })
      } else {
        return res.status(404).json({ success: false, message: 'Topic not found' })
      }
    } catch (error) {

      console.error('Error deleting topic', error);
      return res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
  else if(req.method === 'PUT'){
    const {id,TopicTitle,Topicdesc} = req.body;
    if(!id || !TopicTitle || !Topicdesc){
      res.status(400).json({success:false,message:'id Title and description are required'})}
     try{
      const client = await clientPromise;
      const db = client.db('Topics');
      const collection = db.collection('Topics_collection');  

      const result = await collection.updateOne({_id : new ObjectId(id)},{ $set:{TopicTitle,Topicdesc}});
      if(result.matchedCount ===1){
        return res.status(200).json({success:true,message:'Topic deleted successfully '})
      }else {
        return res.status(404).json({success:false,message:'Topic not found'})
      }
     }catch(error){
      console.error('error updating topic:',error)
      return res.status(500).json({success:false,error:'Internal server error'})
     } 
  }
  

  else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE','PUT']);
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
