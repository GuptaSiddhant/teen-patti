import React from "react";
import { User, GuptasiRequest } from "../../helper";
import { firestore } from "../firebase";

export const requestGuptasi = (user: User) => {
  const newRequest: GuptasiRequest = {
    amount: 500,
    approved: false,
    reviewed: false,
    user,
    uid: ""
  };
  try {
    firestore
      .collection("guptasi")
      .doc()
      .set(newRequest);
  } catch (error) {
    console.error("Error while requesting Guptasi", error);
  }
};

export const useGetAllGuptasiRequest = () => {
  const [requests, setRequest] = React.useState<GuptasiRequest[]>([]);
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("guptasi")
      .where("reviewed", "==", false)
      .onSnapshot(querySnapshot => {
        const allRequests: GuptasiRequest[] = [];
        querySnapshot.forEach(doc => {
          const req = doc.data() as GuptasiRequest;
          req.uid = doc.id;
          allRequests.push(req);
        });
        setRequest(allRequests);
      });
    return () => unsubscribe();
  }, []);
  return requests;
};

export const approveReviewRequest = (req: GuptasiRequest) =>
  firestore
    .collection("guptasi")
    .doc(req.uid)
    .update({ reviewed: true, approved: true });

export const declineReviewRequest = (req: GuptasiRequest) =>
  firestore
    .collection("guptasi")
    .doc(req.uid)
    .update({ reviewed: true, approved: false });
