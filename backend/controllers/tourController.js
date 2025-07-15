import Tour from '../models/Tour.js';

// ✅ Create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: 'Successfully created',
      data: savedTour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create. Try again!' });
  }
};

// ✅ Update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedTour, // ✅ FIXED
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update',
    });
  }
};

// ✅ Delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Successfully deleted',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete',
    });
  }
};

// ✅ Get single tour
// export const getSingleTour = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const tour = await Tour.findById(id).populate('reviews');

//     res.status(200).json({
//       success: true,
//       message: 'Successful',
//       data: tour,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: 'Not found',
//     });
//   }
// };

export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate({ path: 'reviews', strictPopulate: false });


    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found!',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

// ✅ Get all tours (with pagination)
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: 'Successful',
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Not found',
    });
  }
};

export const getTourBySearch = async (req, res) => {
  const city = new RegExp(`^${req.query.city.trim()}$`, 'i'); // ✅ updated
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  const query = {
    city,
    maxGroupSize: { $gte: maxGroupSize },
  };

  try {
    const tours = await Tour.find(query).populate('reviews');
    res.status(200).json({
      success: true,
      message: 'Successful',
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Not found',
    });
  }
};


// ✅ Get featured tours
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate('reviews')
      .limit(8);

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Not found',
    });
  }
};

// ✅ Get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch' });
  }
};
