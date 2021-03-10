# draft-hargreaves-odap-02

## 1. Introduction

There is a lack of interoperability between individual blockchains, but also a general difficulty building open DLT networks.	Extant networks are custom built and relatively closed, usually limited to networks of a single DLT type.

This memo proposes at DLT-agnostic protocol in order to allow the creation of business applications that use and modify multiple DLTs, through a single programmatic interface.

The target DLTs can be of any type, operated by different owners and managed using different DLT interoperability / management platforms that implement ODAP interfaces.

These platforms may act as gateways or relays for the application to interact with the hosted DLTs.	They are referred to herein as DLT Gateways.

When correctly implemented and deployed, the protocol should provide the basis for solutions involving asset migration between two DLT systems, as well as use-cases when one side is non-DLT system (e.g. legacy system).


## 2. Conventions used in this document

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted as described in RFC 2119 [RFC2119].

In this document, these words will appear with that interpretation only when in ALL CAPS.	Lower case uses of these words are not to be interpreted as carrying significance described in RFC 2119.


## 3. Terminology

The following are some terminology used in the current document. Further terminology can be found in [Arch].

Client application: This is the application employed by a user to interact with a gateway node.

Gateway: The node of the DLT system functionally capable of acting as a gateway in an asset transfer.

Sender gateway: The gateway that initiates a unidirectional asset transfer.

Recipient gateway: The gateway that is the recipient side of a unidirectional asset transfer.

DLT resources: The various interior protocols, data structures and cryptographic constructs that are a core part of a DLT system.

Off-DLT resources: The various resources that are outside a DLT system, and are not part of the operations of the DLT system.

Role: As in the classic client-server roles.	In the gateway-to- gateway interaction, one gateway will take the role of the client while the other takes the role of the server, depending on the type of interaction flow.

Claim: An assertion made by an Entity [JWT].

Claim Type: Syntax used for representing a Claim Value [JWT].

DLT Claim: An assertion made by a Gateway regarding the status or condition of resources (e.g. asset, public keys, etc.) accessible to that gateway within its DLT system.


## 4. Open Digital Asset Protocol

### 4.1.	Overview

The Open Digital Asset Protocol (ODAP) is a gateway-to-gateway protocol used by a sender gateway with a recipient gateway to perform a unidirectional transfer of a virtual asset [Arch].

The protocol defines a number of API endpoints, resources and identifier definitions, and message flows corresponding to the asset transfer between the two gateways.


## 5. ODAP Message Format, Identifiers and Descriptors


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

#### 7.1. Transfer Commence Message (Request)

This message is sent from the client (sender gateway) to the Transfer Request Endpoint at the server.	It signals to the server that the client is ready to start the transfer of the digital asset.

The message must contain claims related to the information from the previous flow (Phase 1).	It must be signed by the client (sender gateway).

The parameters of this message consists of the following:

- message_type REQUIRED.	MUST be the value urn:ietf:odap:msgtype:transfer-commence-msg

- originator_pubkey REQUIRED.	This is the public key of the asset owner (originator) in the origin DLT system.

- beneficiary_pubkey REQUIRED.	This is the public key of the beneficiary in the destination DLT system.

- sender_dlt_system REQUIRED.	This is the identifier of the origin DLT system behind the client.

- recipient_dlt_system REQUIRED.	This is the identifier of the destination DLT system behind the server.

- client_identity_pubkey REQUIRED. The gateway who sent this message.

- server_identity_pubkey REQUIRED. The gateway for whom this message is intended.

- hash_asset_profile REQUIRED.	This is the hash of the asset profile previously agreed upon.

- asset_unit REQUIRED.	This is the unit amount of the asset being transferred, previously agreed upon.

- hash_prev_message REQUIRED. The has of the last message in Phase 1.

- client_transfer_number OPTIONAL.	This is the transfer identification number chosen by the client.	This number is meaningful only the client.

- client_signature REQUIRED. The gateway's signature (G1 as client)


#### 7.2. Transfer Commence Acknowledge Message (Response)

This message is sent from the server (recipient gateway) to client (sender gateway) in response to a Transfer Commence Request from the client.

The message must be signed by the server (recipient gateway). 

The parameters of this message consists of the following:

- message_type REQUIRED urn:ietf:odap:msgtype:transfer-commenceresp

- client_identity_pubkey REQUIRED. The gateway who sent this msg

- server_identity_pubkey REQUIRED. The gateway for whom this is intended

- hash_commence_request REQUIRED. The hash of previous request msg

- server_transfer_number OPTIONAL.	This is the transfer identification number chosen by the client.	This number is meaningful only the client.

- server_signature REQUIRED. The gateway's signature (G2 as server)



#### 7.3. Lock Evidence Message (Request)

#### 7.4. Lock-evidence Receipt Message (Response)
