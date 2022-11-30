import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotels = async (request, response, next) => {
  const newHotel = new Hotel(request.body);
  try {
    const savedHotel = await newHotel.save();
    response.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotels = async (request, response, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};
export const deleteHotels = async (request, response, next) => {
  try {
    await Hotel.findByIdAndDelete(request.params.id);
    response.status(200).json("Hotel has been deleted Successfully");
  } catch (error) {
    next(error);
  }
};
export const getHotels = async (request, response, next) => {
  try {
    const hotel = await Hotel.findById(request.params.id);
    response.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (request, response, next) => {
  const { min, max, ...others } = request.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 1000 },
    }).limit(request.query.limit);
    response.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    //Fetching all data by Type
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async(request, response, next) => {
  try {
    const hotel = await Hotel.findById(request.params.id);
    const list = await  Promise.all(
      hotel.rooms.map((roomId) => {
        return Room.findById(roomId);
      })
    );
    response.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
