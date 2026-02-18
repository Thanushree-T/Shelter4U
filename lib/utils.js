import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Deeply serializes MongoDB documents by converting ObjectIds and Dates to strings.
 * Safe to use on null, undefined, arrays, and nested objects.
 */
export function serializeMongo(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle various MongoDB/Mongoose specific types
  if (typeof obj === "object" && obj !== null) {
    // If it has a toString method and is strictly a BSON ObjectId (or similar), convert
    // We check for _bsontype or if it looks like an ObjectId (24 hex chars)
    if (
      obj.toString &&
      (obj._bsontype === "ObjectID" || obj._bsontype === "ObjectId")
    ) {
      return obj.toString();
    }

    // Handle Dates
    if (obj instanceof Date) {
      return obj.toISOString();
    }

    // Handle Arrays
    if (Array.isArray(obj)) {
      return obj.map((item) => serializeMongo(item));
    }

    // Handle Plain Objects
    // Create a new object to avoid mutating the original if desired,
    // though strict mutation might be more performant, deep cloning is safer.
    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Recursively serialize
        newObj[key] = serializeMongo(obj[key]);
      }
    }
    return newObj;
  }

  // Return primitives (string, number, boolean) as is
  return obj;
}
