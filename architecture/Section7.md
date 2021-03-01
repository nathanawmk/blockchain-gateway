# ODAP Draft


## 6. Transfer Initiation Flow (Phase 1) 
TBD



## 7. Lock-Evidence Verification Flow (Phase 2)

This section describes the conveyance of claims regarding to the status of assets or resources from a sender gateway to a recipient gateway.

In the following, the sender gateway takes the role of the client while the recipient gateway takes the role of the server.

The flow follows a request-response model. The client makes a request (POST) to the Transfer Request Endpoint (API Type-3) at the server gateway.

Gateways as servers MUST support the use of the HTTP GET and POST methods defined in RFC 2616 [RFC2616] at the Transfer Request Endpoint and the Evidence Validation Endpoint.
  
Clients MAY use the HTTP GET or POST methods to send the Transfer Commence Request or the Evidence Validation Request to the Recipient Server.	If using the HTTP GET method, the request parameters maybe serialized using URI Query String Serialization.

The client and server may be required to sign certain messages in order to provide standalone proof (for non-repudiation) independent of the secure channel between the client and server.	This proof maybe required for audit verifications post-event.

(NOTE: nonces are not shown).

#### 7.1. Transfer Commence Message

