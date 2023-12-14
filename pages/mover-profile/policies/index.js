import useMover from "@/hooks/useMover";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { FaArrowDownLong } from "react-icons/fa6";

const TermsAndPolicies = () => {
  // const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const {
    justRegistered,
    personalMoverDetails,
    companyDetails,
    companyDocs,
    allMoverData,
    updateJustR,
    resetJustR,
    updatePersonalMover,
    resetPersonalMover,
    updateCompanyDe,
    resetCompanyDe,
    updateCompanyDo,
    resetCompanyDo,
    updateAllMoverD,
    resetAllMoverD,
    router,
  } = useMover();

  // const checkAccepted = oldApplication?.some(
  //   (pa) => pa.mover === personalMoverDetails?.generatedName
  // );

  const [showButton, setShowButton] = useState("");
  const [accept, setAccept] = useState(null);
  const [reload, setReload] = useState(false);

  const firstName = personalMoverDetails?.firstName;
  const lastName = personalMoverDetails?.lastName;
  const uid = personalMoverDetails?.uid;

  const updateMoverAcceptance = async () => {
    const moversRef = doc(db, "moversData", uid);

    if (accept === true) return;

    // const newMoveData = moverData?.notifications?.filter(
    //   (md) => md.date !== data.date
    // );

    // console.log({ newMoveData });

    try {
      setAccept(true);
      await setDoc(
        moversRef,

        {
          acceptedTerms: true,
        },
        { merge: true }
      );

      setReload(true);

      console.log("mover term acceptance update was successful @ policies");
    } catch (error) {
      console.log(error);
      console.log("mover term acceptance update was unsuccessful @ policies");
    }
  };

  useEffect(() => {
    const getMD = async () => {
      const bookingRef = doc(db, "moversData", uid);
      const docSnap = await getDoc(bookingRef);
      const moverDat = docSnap.data();

      console.log({ moverDat });

      setAccept(moverDat?.acceptedTerms);
      // const moverData2 = docSnap.data();

      // const sortMoverData = [...moverDat]?.sort((a, b) => {
      //   return new Date(b.date) - new Date(a.date);
      // });

      // const readD = sortMoverData?.filter((sm) => sm.status === "read");
      // const unreadD = sortMoverData?.filter((sm) => sm.status === "unread");

      // setReadData(readD);
      // setUnreadData(unreadD);
      // setNotificationData(sortMoverData);
      // setMoverData(moverData2);
    };

    getMD();
  }, [reload]);

  useEffect(() => {
    if (!userDetails.userDetails) {
      router.push("/");
    }
  }, []);

  console.log({ accept });

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Terms & Policies</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <main>
        <div className='bg-white/90 pt-[50px] pb-[50px] px-[30px] min-h-[100vh]'>
          <section className='mb-[30px]  px-[0px] '>
            <div className='flex flex-col'>
              <p className='font-bold text-[25px] mb-[0px]'>
                Terms and Policies
              </p>
              <div className='flex flex-col space-y-[10px] md:space-y-0 md:flex-row md:items-center '>
                <p className=''>
                  Familiarise yourself with our terms and policies.{" "}
                </p>
                {
                  <div className='flex items-center ml-[5px] space-x-[5px] cursor-pointer'>
                    <a
                      href='#acceptance'
                      className='text-primary font-semibold link'
                    >
                      {accept ? "Accepted" : "Accept terms"}{" "}
                    </a>
                    {accept === false && (
                      <FaArrowDownLong className='text-primary animate-bounce' />
                    )}
                  </div>
                }
              </div>
            </div>
          </section>

          {/* role 1 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>
              Terms and conditions
            </p>
            <p className='mb-[0px]'>
              <span className='font-bold'>
                {`These terms and conditions ("Terms", "Agreement") are an agreement
                between REMOVALSELFSTORAGE ("REMOVALSELFSTORAGE",
                "us", "we" or "our") and ${firstName} ${lastName} (${firstName} ${lastName}, "you" or "your").`}
              </span>{" "}
              This Agreement sets forth the general terms and conditions of your
              use of the removalselfstorage.co.uk website and any of its
              products or services (collectively, "Website" or "Services").
            </p>
          </div>

          {/* role 2 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>
              Information about us
            </p>
            <p className='mb-[0px]'>
              removalselfstorage.co.uk is a site operated by REMOVALSELFSTORAGE
              CORP LTD. We are a limited company registered in England and Wales
              under company number 12291875 and have our registered office at
              124 City Road, London, EC1V 2NX.
            </p>
          </div>

          {/* role 3 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>
              Accounts and membership
            </p>
            <p className='mb-[0px]'>
              If you create an account on the Website, you are responsible for
              maintaining the security of your account and you are fully
              responsible for all activities that occur under the account and
              any other actions taken in connection with it. We may monitor and
              review new accounts before you may sign in and use our Services.
              Providing false contact information of any kind may result in the
              termination of your account. You must immediately notify us of any
              unauthorized uses of your account or any other breaches of
              security. We will not be liable for any acts or omissions by you,
              including any damages of any kind incurred as a result of such
              acts or omissions. We may suspend, disable, or delete your account
              (or any part thereof) if we determine that you have violated any
              provision of this Agreement or that your conduct or content would
              tend to damage our reputation and goodwill. If we delete your
              account for the foregoing reasons, you may not re-register for our
              Services. We may block your email address and Internet protocol
              address to prevent further registration.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>User content</p>
            <p className='mb-[0px]'>
              We do not own any data, information or material ("Content") that
              you submit on the Website in the course of using the Service. You
              shall have sole responsibility for the accuracy, quality,
              integrity, legality, reliability, appropriateness, and
              intellectual property ownership or right to use of all submitted
              Content. We may, but have no obligation to, monitor and review
              Content on the Website submitted or created using our Services by
              you. Unless specifically permitted by you, your use of the Website
              does not grant us the license to use, reproduce, adapt, modify,
              publish or distribute the Content created by you or stored in your
              user account for commercial, marketing or any similar purpose. But
              you grant us permission to access, copy, distribute, store,
              transmit, reformat, display and perform the Content of your user
              account solely as required for the purpose of providing the
              Services to you. Without limiting any of those representations or
              warranties, we have the right, though not the obligation, to, in
              our own sole discretion, refuse or remove any Content that, in our
              reasonable opinion, violates any of our policies or is in any way
              harmful or objectionable.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>
              Billing and payment
            </p>
            <p className='mb-[0px]'>
              You shall pay all fees or charges to your account in accordance
              with the fees, charges, and billing terms in effect at the time a
              fee or charge is due and payable. If auto-renewal is enabled for
              the Services you have subscribed for, you will be charged
              automatically in accordance with the term you selected. Sensitive
              and private data exchange happens over a SSL secured communication
              channel and is encrypted and protected with digital signatures,
              and our Website is also in compliance with PCI vulnerability
              standards in order to create as secure of an environment as
              possible for Users. Scans for malware are performed on a regular
              basis for additional security and protection. If, in our judgment,
              your purchase constitutes a high-risk transaction, we will require
              you to provide us with a copy of your valid government-issued
              photo identification, and possibly a copy of a recent bank
              statement for the credit or debit card used for the purchase. We
              reserve the right to change products and product pricing at any
              time. We also reserve the right to refuse any order you place with
              us. We may, in our sole discretion, limit or cancel quantities
              purchased per person, per household or per order. These
              restrictions may include orders placed by or under the same
              customer account, the same credit card, and/or orders that use the
              same billing and/or shipping address. In the event that we make a
              change to or cancel an order, we may attempt to notify you by
              contacting the e-mail and/or billing address/phone number provided
              at the time the order was made.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>
              Third-party services
            </p>
            <p className='mb-[0px]'>
              If you decide to enable, access or use third-party services, be
              advised that your access and use of such other services are
              governed solely by the terms and conditions of such other
              services, and we do not endorse, are not responsible or liable
              for, and make no representations as to any aspect of such other
              services, including, without limitation, their content or the
              manner in which they handle data (including your data) or any
              interaction between you and the provider of such other services.
              You irrevocably waive any claim against REMOVALSELFSTORAGE CORP
              LIMITED with respect to such other services. REMOVALSELFSTORAGE
              CORP LIMITED is not liable for any damage or loss caused or
              alleged to be caused by or in connection with your enablement,
              access or use of any such other services, or your reliance on the
              privacy practices, data security processes or other policies of
              such other services. You may be required to register for or log
              into such other services on their respective websites. By enabling
              any other services, you are expressly permitting
              REMOVALSELFSTORAGE CORP LIMITED to disclose your data as necessary
              to facilitate the use or enablement of such other service.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>
              Accuracy of information
            </p>
            <p className='mb-[0px]'>
              Occasionally there may be information on the Website that contains
              typographical errors, inaccuracies or omissions that may relate to
              product descriptions, pricing, availability, promotions and
              offers. We reserve the right to correct any errors, inaccuracies
              or omissions, and to change or update information or cancel orders
              if any information on the Website or on any related Service is
              inaccurate at any time without prior notice (including after you
              have submitted your order). We undertake no obligation to update,
              amend or clarify information on the Website including, without
              limitation, pricing information, except as required by law. No
              specified update or refresh date applied on the Website should be
              taken to indicate that all information on the Website or on any
              related Service has been modified or updated.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>Backups</p>
            <p className='mb-[0px]'>
              We perform regular backups of the Website and Content and will do
              our best to ensure completeness and accuracy of these backups. In
              the event of the hardware failure or data loss we will restore
              backups automatically to minimize the impact and downtime.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>
              Links to other websites
            </p>
            <p className='mb-[0px]'>
              Although this Website may link to other websites, we are not,
              directly or indirectly, implying any approval, association,
              sponsorship, endorsement, or affiliation with any linked website,
              unless specifically stated herein. Some of the links on the
              Website may be "affiliate links". This means if you click on the
              link and purchase an item, REMOVALSELFSTORAGE CORP LIMITED will
              receive an affiliate commission. We are not responsible for
              examining or evaluating, and we do not warrant the offerings of,
              any businesses or individuals or the content of their websites. We
              do not assume any responsibility or liability for the actions,
              products, services, and content of any other third-parties. You
              should carefully review the legal statements and other conditions
              of use of any website which you access through a link from this
              Website. Your linking to any other off-site websites is at your
              own risk.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>Indemnification</p>
            <p className='mb-[0px]'>
              You agree to indemnify and hold REMOVALSELFSTORAGE CORP LIMITED
              and its affiliates, directors, officers, employees, and agents
              harmless from and against any liabilities, losses, damages or
              costs, including reasonable attorneys' fees, incurred in
              connection with or arising from any third-party allegations,
              claims, actions, disputes, or demands asserted against any of them
              as a result of or relating to your Content, your use of the
              Website or Services or any willful misconduct on your part.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>Compensation</p>
            <p className='mb-[0px]'>
              Some of the links on the Website may be "affiliate links". This
              means if you click on the link and purchase an item,
              REMOVALSELFSTORAGE CORP LIMITED will receive an affiliate
              commission.
            </p>
          </div>

          {/* role 4 */}
          <div className='mb-[20px]'>
            <p className='font-bold mb-[10px] text-[18px]'>
              Acceptance of this disclaimer
            </p>
            <p className='mb-[0px]'>
              You acknowledge that you have read this Disclaimer and agree to
              all its terms and conditions. By accessing the Website you agree
              to be bound by this Disclaimer. If you do not agree to abide by
              the terms of this Disclaimer, you are not authorized to use or
              access the Website.
            </p>
          </div>

          <div
            className='w-full text-center mt-[30px] mb-[20px] '
            id='acceptance'
          >
            <div
              onClick={updateMoverAcceptance}
              disabled={accept === true}
              className={`btn btn-primary btn-wide`}
            >
              {accept ? "Accepted" : "Accept"}
            </div>
          </div>
        </div>
      </main>
    </MoverLayout>
  );
};

export default TermsAndPolicies;
